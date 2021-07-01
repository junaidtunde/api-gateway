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

@ApiTags('/loan')
@ApiHeader({
  name: 'Loan',
  description: 'Bearer <token>',
})
@Controller('/v1/loan')
export class LoanController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Get('/')
  async getAllLoans(@Req() req: Request, @Res() res: Response): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getAllLoans',
      body,
    );
  }

  @Get('/car/:id')
  async getLoanCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'getLoanCar', {
      id: req.params.id,
    });
  }

  @Get('/loan_user')
  async getAllLoanUsers(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getAllLoanUsers',
      body,
    );
  }

  @Get('/statuses')
  async getAllLoanStatuses(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getAllLoanStatuses',
    );
  }

  @Get('/user_progress')
  async getAllUserProgress(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getAllUserProgress',
    );
  }

  @Get('/new_requests')
  async getBankReviewLoans(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getBankReviewLoans',
      body,
    );
  }

  @Get('/corporate')
  async getCorporatePartnersLoans(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getCorporatePartnersLoans',
      body,
    );
  }

  @Get('/offered')
  async getBankOfferedLoans(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getBankOfferedLoans',
      body,
    );
  }

  @Get('/approved')
  async getBankApprovedLoans(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getBankApprovedLoans',
      body,
    );
  }

  @Get('/bank_admin')
  async getAllBankAdmins(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getAllBankAdmins',
      body,
    );
  }

  @Get('/personalised/bank_admin')
  async getAllPersonalisedBankAdmins(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getAllPersonalisedBankAdmins',
      body,
    );
  }

  @Post('/personalised/bank_admin')
  async personaliseBankAdmin(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'personaliseBankAdmin',
      req.body,
    );
  }

  @Get('/loan_user/:id')
  async getLoanUser(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'getLoanUser', {
      id: req.params.id,
    });
  }

  @Get('/bank_admin/:id')
  async getBankAdmin(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'getBankAdmin', {
      id: req.params.id,
    });
  }

  @Get('/offer/:id')
  async getOfferByBank(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'getLoanUser', {
      id: req.params.id,
    });
  }

  @Get('/mono/:id')
  async getMonoInfo(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'getMonoInfo', {
      id: req.params.id,
    });
  }

  @Get('/mono_ids')
  async getAllMonoIds(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'getAllMonoIds');
  }

  @Get('/expired')
  async fetchExpiredLoan(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'fetchExpiredLoan',
      data,
    );
  }

  @Get('/my-customer-loans')
  async getBankCustomerLoan(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'myCustomerLoan',
      data,
    );
  }

  @Get('/corporate-partners')
  async getAllCorporatePartner(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getAllCorporatePartner',
      body,
    );
  }

  @Get('/dealer-loan')
  async getAllDealerLoan(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = {
      ...req.query,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getAllDealerLoan',
      data,
    );
  }

  @Get('/dealer-car-loan')
  async getAllDealerCarLoans(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = {
      ...req.query,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getAllDealerCarLoans',
      data,
    );
  }

  @Get('/:id')
  async getLoan(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'getLoan', {
      id: req.params.id,
    });
  }

  @Post('/add_mono_code')
  async createMonoId(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'createMonoId',
      req.body,
    );
  }

  @Post('/personal-information')
  async createPersonalInformation(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'createPersonalInfo',
      req.body,
    );
  }

  @Post('/salary_earner')
  async createSalaryEarnerInfo(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'createSalaryEarnerInfo',
      req.body,
    );
  }

  @Post('/business_client')
  async createBusinessClientInfo(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'createBusinessClientInfo',
      req.body,
    );
  }

  @Post('/make_deposit')
  async makeDeposit(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'makeDeposit',
      req.body,
    );
  }

  @Post('/make_offer')
  async makeLoanOffer(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'makeLoanOffer',
      req.body,
    );
  }

  @Post('/decline_loan')
  async declineLoan(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'declineLoan',
      req.body,
    );
  }

  @Post('/customer_decline_offer')
  async customerDeclineOffer(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'customerDeclineOffer',
      req.body,
    );
  }

  @Post('/accept_offer')
  async userAcceptsOffer(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'userAcceptsOffer',
      req.body,
    );
  }

  @Post('/okra_creds')
  async collectOkraCreds(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'collectOkraCreds',
      req.body,
    );
  }

  @Post('/crc_creds')
  async collectCRCCreds(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'collectCRCCreds',
      req.body,
    );
  }

  @Post('/document_upload')
  @UseInterceptors(
    new FileUploadInterceptor([{ name: 'documentMedia', public: false }]),
  )
  async uploadFile(@Req() req: Request, @Res() res: Response): Promise<any> {
    const reqInterceptor: any = req;
    const data = {
      documentMedia: reqInterceptor.files.documentMedia.url,
      ...req.body,
    };
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'uploadFile', data);
  }

  @Post('/crc_login')
  async crcLogin(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'crcLogin',
      req.body,
    );
  }

  @Post('/loan_user/create')
  async createLoanUser(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'createLoanUser',
      req.body,
    );
  }

  @Post('/bank_admin')
  async createBankAdmin(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'createBankAdmin',
      req.body,
    );
  }

  @Delete('/:id')
  async deleteLoan(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'deleteLoan', {
      id: req.params.id,
    });
  }

  @Delete('/offer/:id')
  async deleteOffer(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'deleteOffer', {
      id: req.params.id,
    });
  }

  @Delete('/loan_user/:id')
  async deleteProfile(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'deleteProfile', {
      id: req.params.id,
    });
  }

  @Delete('/utm_param/:id')
  async deleteParam(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'deleteParam', {
      id: req.params.id,
    });
  }

  @Post('/application')
  async loanApplication(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'loanApplication',
      req.body,
    );
  }

  @Post('/revoke_offer')
  async revokeOffer(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'revokeOffer',
      req.body,
    );
  }

  @Post('/change_car')
  async changeCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'changeCar',
      req.body,
    );
  }

  @Post('/add_webhook')
  async addBankAdminWebhook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'addBankAdminWebhook',
      req.body,
    );
  }

  @Post('/bank/add_type')
  async addBankAdminType(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'addBankAdminType',
      req.body,
    );
  }

  @Post('/charges')
  async addCountryCharges(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'addCountryCharges',
      req.body,
    );
  }

  @Post('/okra/callback')
  async okraBankStatementCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'okraBankStatementCallback',
      req.body,
    );
  }

  @Post('/mono/callback')
  async monoBankStatementCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body = req.body;
    const data = {
      event: body.event,
      data_status: body.data.meta.data_status,
      account_id: body.data.account._id,
    };

    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'monoBankStatementCallback',
      data,
    );
  }

  @Post('/mono')
  async collectMonoInfo(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'collectMonoInfo',
      req.body,
    );
  }

  @Put('/mono/:id')
  async updateMonoInfo(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'updateMonoInfo',
      data,
    );
  }

  @Put('/:id')
  async updateLoan(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(req, res, TYPES.LOAN_SVC, 'updateLoan', data);
  }

  @Post('/bank_statement')
  async collectManualBankStatement(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'collectManualBankStatement',
      req.body,
    );
  }

  @Post('/route-config')
  async createRouteConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'createRouteConfig',
      req.body,
    );
  }

  @Post('/additional-documents')
  async requestAdditionalInfo(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'requestAdditionalInfo',
      req.body,
    );
  }

  @Post('/upload-additional-documents')
  async uploadAdditionalDocuments(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'uploadAdditionalDocuments',
      req.body,
    );
  }

  @Post('/feedback')
  async addLoanFeedback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'addLoanFeedback',
      req.body,
    );
  }

  @Post('/visibility')
  async toggleLoanVisibility(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'toggleLoanVisibility',
      req.body,
    );
  }

  @Post('/disburse')
  async disburseLoan(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'disburseLoan',
      req.body,
    );
  }

  @Post('/seed-review-date')
  async seedReviewDate(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'seedReviewDate',
      req.body,
    );
  }

  @Post('/dealer-loan')
  async submitDealerLoanRequest(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'submitDealerLoanRequest',
      req.body,
    );
  }

  @Get('/dealer-loan/:id')
  async getSingleDealerLoan(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = {
      requestId: req.params.id,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getSingleDealerLoan',
      data,
    );
  }

  @Post('/equity_payment')
  async makeEquityPayment(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'makeEquityPayment',
      req.body,
    );
  }

  @Get('/offer-info/:id')
  async getOfferInformation(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = {
      offerId: req.params.id,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getOfferInformation',
      data,
    );
  }

  @Put('/update-bank-report-status/:id')
  async updateBankReportStatus(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { offerId: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'updateBankReportStatus',
      data,
    );
  }

  @Post('/corporate-partners')
  async createCorporatePartner(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'createCorporatePartner',
      req.body,
    );
  }

  @Put('/corporate-partners/activate/:id')
  async activateCorporatePartner(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'activateCorporatePartner',
      data,
    );
  }

  @Post('/reminder')
  async sendEmailReminder(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'sendEmailNotification',
      req.body,
    );
  }

  @Post('/bank/additional-information')
  async saveBankAdditionalInformation(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'saveBankAdditionalInformation',
      req.body,
    );
  }

  @Post('/generate-performa-invoice')
  async generatePerformaInvoice(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'generatePerformaInvoice',
      req.body,
    );
  }

  @Post('/add-config-to-bank-info')
  async addConfigToBankAdditionalInfo(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'addConfigToBankAdditionalInfo',
      req.body,
    );
  }

  @Get('/income/threshold')
  async fetchIncomeThreshold(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'fetchIncomeThreshold',
      data,
    );
  }
  @Post('/income/threshold')
  async createIncomeThreshold(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'createIncomeThreshold',
      req.body,
    );
  }
  @Put('/income/threshold/:id')
  async updateIncomeThreshold(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'updateIncomeThreshold',
      data,
    );
  }
  @Delete('/income/threshold/:id')
  async deleteIncomeThreshold(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'deleteIncomeThreshold',
      data,
    );
  }
}
