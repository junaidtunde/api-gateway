import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';
import PaymentWebhookRequestDTO from './data-objects/payment-webhook-request-dto';
import { PaymentGatewaysEnum } from './data-objects/types';

@Injectable()
export default class PaymentsHelper {
  private readonly inventorySvc: any;
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
    @Inject(TYPES.INVENTORY_SVC) private readonly inventoryClient: ClientGrpc,
  ) {
    this.inventorySvc = this.inventoryClient.getService('InventoryService');
  }
  private requestInventorySvc(req: Request, method: string, payload: any): any {
    const { data, grpcMetadata } = this.proxyService.prepGRPCPayload(
      req,
      payload,
    );
    return this.inventorySvc[method](data, grpcMetadata).toPromise();
  }
  async paymentWebhook(req: Request, res: Response): Promise<any> {
    let body = req.body;
    const queryParams = req.query;

    const paymentSource = queryParams.source;
    if (
      paymentSource !== PaymentGatewaysEnum.Flutterwave &&
      paymentSource !== PaymentGatewaysEnum.Paystack &&
      paymentSource !== PaymentGatewaysEnum.Seerbit
    ) {
      return res.status(401).json({
        message: 'Unauthorized access!',
      });
    }

    const paymentWebhookRequestDTO = new PaymentWebhookRequestDTO();
    paymentWebhookRequestDTO.rawDataPayload = JSON.stringify(body);

    // Paystack webhook data
    if (queryParams.source === PaymentGatewaysEnum.Paystack) {
      paymentWebhookRequestDTO.source = PaymentGatewaysEnum.Paystack;
      paymentWebhookRequestDTO.amount = body.data.amount;
      paymentWebhookRequestDTO.currency = body.data.currency;
      paymentWebhookRequestDTO.event = body.event;
      paymentWebhookRequestDTO.paidAt = body.data.paidAt;
      paymentWebhookRequestDTO.paymentMethod = body.data.channel;
      paymentWebhookRequestDTO.status = body.data.status === 'success';
      paymentWebhookRequestDTO.reference = body.data.reference;
      paymentWebhookRequestDTO.paymentGatewayReference = body.data.id;
      paymentWebhookRequestDTO.createdAt = body.data.created_at;
    }

    if (queryParams.source === 'seerbit') {
      res.status(200).json({});
      if (body.notificationItems) {
        body = body.notificationItems[0];
        body = {
          accountNumber: body.notificationRequestItem.creditAccountNumber,
          rawDataPayload: JSON.stringify(body),
        };
      } else {
        body = {
          accountNumber: body.accountNumber,
          rawDataPayload: JSON.stringify(body),
        };
      }
      await this.requestInventorySvc(req, 'updateBlackFridaySoldCars', body);
      return;
    }

    // Flutterwave webhook data
    if (queryParams.source === PaymentGatewaysEnum.Flutterwave) {
      const { event } = body;
      if (body.data != null) {
        body = body.data;
      }
      paymentWebhookRequestDTO.event = event;
      paymentWebhookRequestDTO.source = PaymentGatewaysEnum.Flutterwave;
      paymentWebhookRequestDTO.amount = body.amount;
      paymentWebhookRequestDTO.currency = body.currency;
      paymentWebhookRequestDTO.paidAt = body.paidAt;
      paymentWebhookRequestDTO.status = body.status === 'successful';
      paymentWebhookRequestDTO.reference = body.tx_ref;
      paymentWebhookRequestDTO.paymentGatewayReference = body.flwRef
        ? body.flwRef
        : body.flw_ref;
      paymentWebhookRequestDTO.createdAt = body.createdAt;
      paymentWebhookRequestDTO.paymentMethod = body.payment_type;
    }
    const paymentData = classToPlain(paymentWebhookRequestDTO);
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'paymentsGatewayWebhook',
      paymentData,
    );
  }
}
