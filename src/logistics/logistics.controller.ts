import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { FileUploadInterceptor } from '../interceptor/file-upload.interceptor';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';

@ApiTags('/logistics')
@ApiHeader({
  name: 'Logistics',
  description: 'Bearer <token>',
})
@Controller('/v1/logistics')
export class LogisticsController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Get('/vendor/bills')
  async getVendorBills(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getVendorBills',
      data,
    );
  }

  @Post('/vendor')
  async createVendor(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'createVendor',
      req.body,
    );
  }

  @Put('/vendor/:id')
  async updateVendor(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'updateVendor',
      data,
    );
  }

  @Delete('/vendor/:id')
  async deleteVendor(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'deleteVendor',
      { id: req.params.id },
    );
  }

  @Get('/vendors')
  async getAllVendors(@Req() req: Request, @Res() res: Response): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getAllVendors',
      body,
    );
  }

  @Get('/vendor/:id')
  async getOneVendor(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getOneVendor',
      { id: req.params.id },
    );
  }

  // Bank Details Route
  @Post('/vendor/bank-details')
  async createBankDetails(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'createBankDetails',
      req.body,
    );
  }

  @Put('/vendor/bank-details/:vendorId')
  async updateBankDetails(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { vendorId: req.params.vendorId, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'updateBankDetails',
      data,
    );
  }

  @Delete('/vendor/bank-details/:id')
  async deleteBankDetails(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'deleteBankDetails',
      data,
    );
  }
  // Driver Routes
  @Post('/driver')
  @UseInterceptors(
    new FileUploadInterceptor([{ name: 'passportImage', public: false }]),
  )
  async createDriver(@Req() req: Request, @Res() res: Response): Promise<any> {
    const reqInterceptor: any = req;
    const data = {
      passportImage: reqInterceptor.files.passportImage.url,
      ...req.body,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'createDriver',
      data,
    );
  }

  @Put('/driver/:id')
  async updateDriver(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'updateDriver',
      data,
    );
  }

  @Delete('/driver/:id')
  async deleteDriver(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'deleteDriver',
      data,
    );
  }

  @Get('/driver/free/:vendorId')
  async getAvailableDrivers(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { vendorId: req.params.vendorId };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getAvailableDrivers',
      data,
    );
  }

  // Document Route
  @Post('/document-config')
  async createDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'createDocumentConfig',
      req.body,
    );
  }

  @Put('/document-config/:id')
  async updateDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'updateDocumentConfig',
      data,
    );
  }

  @Get('/document-config/:location')
  async getDocument(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { location: req.params.location };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getDocumentConfig',
      data,
    );
  }

  // SLA Route
  @Post('/vendor-order/sla')
  async createSLA(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'createSLA',
      req.body,
    );
  }

  @Put('/vendor-order/sla/:id')
  async updateSLA(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'updateSLA',
      data,
    );
  }

  @Delete('/vendor-order/sla/:id')
  async deleteSLA(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'deleteSLA',
      data,
    );
  }

  @Get('/vendor-order/sla')
  async getOrderSLA(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOGISTICS_SVC, 'getSLA');
  }

  // Vendor order Route
  @Post('/vendor-order')
  async createVendorOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'createVendorOrder',
      req.body,
    );
  }

  @Get('/vendor-order/:id/search')
  async orderSearch(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { vendorId: req.params.id, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'orderSearch',
      data,
    );
  }

  @Put('/vendor-order/:id')
  async updateVendorOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'updateVendorOrder',
      data,
    );
  }

  @Delete('/vendor-order/:id')
  async deleteVendorOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'deleteVendorOrder',
      data,
    );
  }

  @Get('/vendor-order/:vendorId')
  async getVendorOrders(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { vendorId: req.params.vendorId, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getVendorOrders',
      data,
    );
  }

  @Post('/vendor-order/otp')
  async validateOtp(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'validateOrderOtp',
      req.body,
    );
  }

  @Get('/admin/stats')
  async getAdminStats(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { vendorId: req.params.vendorId };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getAdminStatistics',
      data,
    );
  }

  @Get('/vendor/stats/:vendorId')
  async getVendorStats(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { vendorId: req.params.vendorId };

    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getVendorStatistics',
      data,
    );
  }

  // Vendor issues route
  @Post('/vendor-order/issue')
  async createOrderIssues(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'createOrderIssues',
      req.body,
    );
  }

  @Put('/vendor-order/issue/:id')
  async updateOrderIssue(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'updateOrderIssue',
      data,
    );
  }

  @Delete('/vendor-order/issue/:id')
  async deleteOrderIssues(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'deleteOrderIssues',
      data,
    );
  }

  @Get('/vendor-order/issue/:vendorId')
  async getOrderIssues(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { vendorId: req.params.vendorId };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getVendorOrderIssues',
      data,
    );
  }

  // Vendor Document
  @Post('/vendor/document')
  @UseInterceptors(
    new FileUploadInterceptor([{ name: 'documentMedia', public: false }]),
  )
  async createVendorDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const reqInterceptor: any = req;
    const data = {
      documentUrl: reqInterceptor.files.documentMedia.url,
      ...req.body,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'createVendorDocument',
      data,
    );
  }

  @Put('/vendor/document/:id')
  @UseInterceptors(
    new FileUploadInterceptor([{ name: 'documentMedia', public: false }]),
  )
  async updateVendorDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const reqInterceptor: any = req;
    const data = {
      documentUrl: reqInterceptor.files.documentMedia.url,
      ...req.body,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'updateVendorDocument',
      data,
    );
  }

  // Driver Document
  @Post('/driver/document')
  @UseInterceptors(
    new FileUploadInterceptor([{ name: 'documentMedia', public: false }]),
  )
  async createDriverDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const reqInterceptor: any = req;
    const data = {
      documentUrl: reqInterceptor.files.documentMedia.url,
      ...req.body,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'createDriverDocument',
      data,
    );
  }

  @Put('/driver/document/:id')
  @UseInterceptors(
    new FileUploadInterceptor([{ name: 'documentMedia', public: false }]),
  )
  async updateDriverDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const reqInterceptor: any = req;
    const data = {
      documentUrl: reqInterceptor.files.documentMedia.url,
      ...req.body,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'updateDriverDocument',
      data,
    );
  }

  // Vendor Pricing
  @Post('/vendor/pricing')
  async createPricingSettings(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'createPricingSettings',
      req.body,
    );
  }

  @Put('/vendor/pricing/:id')
  async updatePricingSettings(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = {
      id: req.params.id,
      ...req.body,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'updatePricingSettings',
      data,
    );
  }

  @Get('/get_pricing')
  async getPricingSettings(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getPricingSettings',
      data,
    );
  }

  @Get('/get_vendor_config/:vendorConfigId')
  async getPricingSettingsById(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = req.params.vendorConfigId;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getPricingSettingsById',
      data,
    );
  }

  @Delete('/vendor/pricing/:id')
  async deletePricingSettings(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'deletePricingSettings',
      data,
    );
  }

  // SLA Route
  @Get('/get-order/:id')
  async getSingleOrder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOGISTICS_SVC,
      'getSingleOrder',
      data,
    );
  }
}
