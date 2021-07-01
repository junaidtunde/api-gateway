import { Inject, Injectable, Logger, Req, Res } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import * as camelcaseKeys from 'camelcase-keys';
import { Request, Response } from 'express';
import { Metadata } from 'grpc';
import { v4 as uuidv4 } from 'uuid';
import { JSONObject, TYPES } from './types';
import { getCountryCity, getMetadata, tranformBoolean } from './utils/helpers';
import { handleError, success } from './utils/responses';

@Injectable()
export class ProxyService {
  private readonly userSvc: any;
  private readonly inventorySvc: any;
  private readonly authSvc: any;
  private readonly logisticsSvc: any;
  private readonly ordersSvc: any;
  private readonly auctionSvc: any;
  private readonly loanSvc: any;
  private readonly walletSvc: any;
  private readonly crmSvc: any;
  private readonly notificationSvc: any;

  constructor(
    @Inject(TYPES.USER_SVC) private readonly userClient: ClientGrpc,
    @Inject(TYPES.INVENTORY_SVC) private readonly inventoryClient: ClientGrpc,
    @Inject(TYPES.AUTHORIZATION_SVC) private readonly authClient: ClientGrpc,
    @Inject(TYPES.LOGISTICS_SVC) private readonly logisticsClient: ClientGrpc,
    @Inject(TYPES.ORDERS_SVC) private readonly ordersClient: ClientGrpc,
    @Inject(TYPES.AUCTION_SVC) private readonly auctionClient: ClientGrpc,
    @Inject(TYPES.LOAN_SVC) private readonly loanClient: ClientGrpc,
    @Inject(TYPES.WALLET_SVC) private readonly walletClient: ClientGrpc,
    @Inject(TYPES.CRM_SVC) private readonly crmClient: ClientGrpc,
    @Inject(TYPES.NOTIFICATION_SVC)
    private readonly notificationClient: ClientGrpc,
  ) {
    this.userSvc = this.userClient.getService('UserService');
    this.inventorySvc = this.inventoryClient.getService('InventoryService');
    this.authSvc = this.authClient.getService('AuthorizationService');
    this.logisticsSvc = this.logisticsClient.getService('LogisticsService');
    this.ordersSvc = this.ordersClient.getService('OrdersService');
    this.auctionSvc = this.auctionClient.getService('AuctionService');
    this.loanSvc = this.loanClient.getService('LoanService');
    this.walletSvc = this.walletClient.getService('WalletService');
    this.crmSvc = this.crmClient.getService('CrmService');
    this.notificationSvc = this.notificationClient.getService(
      'NotificationService',
    );
  }

  async send(
    @Req() req: Request,
    @Res() res: Response,
    service: string,
    endpoint: string,
    data: JSONObject = {},
  ): Promise<any> {
    let svc = null;
    switch (service) {
      case TYPES.USER_SVC:
        svc = this.userSvc;
        break;
      case TYPES.INVENTORY_SVC:
        svc = this.inventorySvc;
        break;
      case TYPES.AUTHORIZATION_SVC:
        svc = this.authSvc;
        break;
      case TYPES.LOGISTICS_SVC:
        svc = this.logisticsSvc;
        break;
      case TYPES.ORDERS_SVC:
        svc = this.ordersSvc;
        break;
      case TYPES.AUCTION_SVC:
        svc = this.auctionSvc;
        break;
      case TYPES.LOAN_SVC:
        svc = this.loanSvc;
        break;
      case TYPES.WALLET_SVC:
        svc = this.walletSvc;
        break;
      case TYPES.CRM_SVC:
        svc = this.crmSvc;
        break;
      case TYPES.NOTIFICATION_SVC:
        svc = this.notificationSvc;
        break;
      default:
        throw new Error('Invalid service name');
    }

    try {
      const { data: reqData, grpcMetadata } = this.prepGRPCPayload(req, data);
      const response = await svc[endpoint](reqData, grpcMetadata).toPromise();
      return success(res, response);
    } catch (err) {
      Logger.error(err);
      handleError(res, err.message);
    }
  }

  prepGRPCPayload(
    req: Request,
    data: JSONObject,
  ): { data: JSONObject; grpcMetadata: Metadata } {
    data = camelcaseKeys(data, { deep: true });
    data = tranformBoolean(data);
    const headers: Request['headers'] = req.headers;
    const ip = headers['x-forwarded-for'] as string;
    const { countryCode, region, city, countryName } = getCountryCity(ip);
    const country = countryCode === '?' ? 'NG' : countryCode;
    const metadata = {
      user: headers.user ? headers.user : '{}',
      country_code: country,
      country_name: countryName,
      region,
      city,
      request_id: uuidv4(),
      ip: ip || '127.0.0.1',
    };
    const grpcMetadata = getMetadata(metadata);
    return {
      data,
      grpcMetadata,
    };
  }
}
