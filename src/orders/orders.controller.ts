import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';
import PaymentsController from './payments.helper';

@Controller('/v1/orders')
export class OrdersController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
    private paymentsController: PaymentsController,
  ) {}

  @Post('/customer-order')
  async createCustomerOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createCustomerOrder',
      req.body,
    );
  }

  @Put('/customer-order/:id')
  async updateCustomerOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'updateCustomerOrder',
      data,
    );
  }

  @Delete('/customer-order/:id')
  async deleteCustomerOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'deleteCustomerOrder',
      { id: req.params.id },
    );
  }

  @Get('/customer-order/:id')
  async getCustomerOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getCustomerOrder',
      data,
    );
  }

  @Get('/user')
  async getUserOrder(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getUserOrder',
      data,
    );
  }

  @Get('/user/search')
  async getUserOrderByEmailOrPhone(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getCustomerOrderByEmailOrPhone',
      data,
    );
  }
  @Get('/user/:id/summary')
  async getCustomerOrderSummary(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getCustomerOrderSummary',
      req.params,
    );
  }

  @Get('/user/customer-orders')
  async listCustomerOrders(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const userData: any = req.headers.user;
    const parsedUserData = JSON.parse(userData);
    const data = { id: parsedUserData.id, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'listCustomerOrders',
      data,
    );
  }

  @Get('/admin/user/:id/customer-orders')
  async adminListCustomerOrders(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'listCustomerOrders',
      data,
    );
  }

  // ROUTE: Discount Book
  @Post('/discount-book')
  async createDiscountBook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createDiscountBook',
      req.body,
    );
  }

  @Get('/discount-book')
  async getAllDiscountBook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getAllDiscountBook',
    );
  }

  @Get('/discount-book/:id')
  async getDiscountBook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getDiscountBook',
      {
        id: req.params.id,
      },
    );
  }

  @Put('/discount-book/:id')
  async updateDiscountBook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'updateDiscountBook',
      data,
    );
  }

  @Delete('/discount-book/:id')
  async deleteDiscountBook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'deleteDiscountBook',
      { id: req.params.id },
    );
  }

  // ROUTE: Coupon
  @Post('/admin/coupon')
  async createCoupon(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createCoupon',
      req.body,
    );
  }

  @Get('/admin/coupon/:id')
  async getCoupon(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.ORDERS_SVC, 'getCoupon', {
      id: req.params.id,
    });
  }

  @Put('/admin/coupon/:id')
  async updateCoupon(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'updateCoupon',
      data,
    );
  }

  @Delete('/admin/coupon/:id')
  async deleteCoupon(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.ORDERS_SVC, 'deleteCoupon', {
      id: req.params.id,
    });
  }

  @Get('/admin/vendors/:id/coupon')
  async getVendorCoupon(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getVendorCoupon',
      {
        id: req.params.id,
      },
    );
  }

  // ROUTE: Fulfil order
  @Post('/fulfil-order')
  async createFulfilOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createFulfilOrder',
      req.body,
    );
  }

  @Get('/fulfil-order/:id')
  async getFulfilmentOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getFulfilmentOrder',
      {
        id: req.params.id,
      },
    );
  }

  @Put('/fulfil-order/:id')
  async updateFulfilOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'updateFulfilOrder',
      data,
    );
  }

  @Delete('/fulfil-order/:id')
  async deleteFulfilOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'deleteFulfilOrder',
      { id: req.params.id },
    );
  }

  // ROUTE: Order Service

  @Post('/services')
  async createOrderService(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createOrderService',
      req.body,
    );
  }

  @Get('/services/:id')
  async getOrderService(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getOrderService',
      {
        id: req.params.id,
      },
    );
  }

  @Put('/services/:id')
  async updateOrderService(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'updateOrderService',
      data,
    );
  }

  @Delete('/services/:id')
  async deleteOrderService(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'deleteOrderService',
      { id: req.params.id },
    );
  }

  // ROUTE: Deductions
  @Post('/deductions')
  async createDeduction(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createDeduction',
      req.body,
    );
  }

  @Get('/deductions/:id')
  async getDeduction(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.ORDERS_SVC, 'getDeduction', {
      id: req.params.id,
    });
  }

  @Put('/deductions/:id')
  async updateDeduction(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'updateDeduction',
      data,
    );
  }

  @Delete('/deductions/:id')
  async deleteDeduction(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'deleteDeduction',
      {
        id: req.params.id,
      },
    );
  }

  @Post('/admin/pricebook/config')
  async createPriceBookConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createPriceBookConfig',
      req.body,
    );
  }

  @Put('/admin/pricebook/config/:id')
  async updatePriceBookConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'updatePriceBookConfig',
      data,
    );
  }

  @Get('/admin/pricebook/config')
  async listPriceBookConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'listPriceBookConfig',
      data,
    );
  }

  @Get('/admin/pricebook/config/:id')
  async getPriceBookConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getPriceBookConfig',
      data,
    );
  }

  @Delete('/admin/pricebook/config/:id')
  async deletePriceBookConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'deletePriceBookConfig',
      data,
    );
  }

  @Post('/admin/fulfil-order/:id/docs/check')
  async fulfillmentDocsCheck(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const userData: any = req.headers.user;
    const parsedUserData = JSON.parse(userData);
    const data = {
      id: req.params.id,
      approver_id: parsedUserData.id,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'fulfillmentDocsCheck',
      data,
    );
  }

  @Post('/admin/fulfil-order/:id/approve')
  async completeFulfillmentOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const userData: any = req.headers.user;
    const parsedUserData = JSON.parse(userData);
    const data = {
      id: req.params.id,
      approver_id: parsedUserData.id,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'completeFulfillmentOrder',
      data,
    );
  }

  @Post('/admin/fulfil-order/:id/cancel')
  async cancelFulfillmentOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const userData: any = req.headers.user;
    const parsedUserData = JSON.parse(userData);
    const data = {
      id: req.params.id,
      approver_id: parsedUserData.id,
      ...req.body,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'cancelFulfillmentOrder',
      data,
    );
  }

  /**
   * All Payments endpoints
   */
  @Post('/payments/webhook')
  @ApiExcludeEndpoint()
  async paymentWebhook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.paymentsController.paymentWebhook(req, res);
  }

  /**
   * Payments endpoints end
   */

  /**
   * Marketplace endpoints
   */
  @Post('/marketplace/buy')
  async createMarketPlaceOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = {
      ...req.body,
      ...req.query,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createMarketPlaceOrder',
      data,
    );
  }

  @Post('/marketplace/inspection')
  async createInspectionOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = {
      ...req.body,
      ...req.query,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createInspectionOrder',
      data,
    );
  }
  /**
   * Marketplace endpoints end
   */

  /**
   * Logistics endpoints
   */

  @Post('/logistics')
  async createLogisticOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = {
      ...req.body,
      ...req.query,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createLogisticOrder',
      data,
    );
  }

  /**
   * Logistics endpoints end
   */

  /**
   * Transactions endpoints
   */
  @Get('/transactions/count')
  async getTransactionCount(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getTransactionCount',
    );
  }

  @Get('/transactions')
  async fetchTransactions(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = {
      ...req.query,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'adminListTransactions',
      data,
    );
  }

  @Get('/transaction-history')
  async fetchTransactionHistory(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = {
      ...req.query,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'adminListTransactionHistory',
      data,
    );
  }

  @Get('/transactions/:id')
  async fetchTransactionById(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = {
      ...req.params,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getTransactionById',
      data,
    );
  }
  /**
   * Transactions endpoints end
   */

  /**
   * Loan endpoints
   */
  @Post('/loan/deposit')
  async createLoanOrderDeposit(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createLoanOrderDeposit',
      data,
    );
  }

  @Get('/currency/rates')
  async getExchangeRateByCurrency(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'getExchangeRateByCurrency',
      data,
    );
  }

  @Post('/reconcile-user')
  async reconcileCustomerOrderUserInfo(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'reconcileUserOrderInfo',
      data,
    );
  }

  /**
   * Equity endpoint
   */
  @Post('/equity/deposit')
  async createEquityDepositOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'createEquityDepositOrder',
      data,
    );
  }

  /**
   * Manually reconcile loan orders
   */
  @Post('/loan/reconcile')
  async manualReconcileTrx(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.ORDERS_SVC,
      'manualReconTrx',
      data,
    );
  }
}
