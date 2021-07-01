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
import { Request, Response } from 'express';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';

@Controller('/v1/franchise')
export class FranchiseController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Post('/')
  async createFranchise(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'createFranchise',
      req.body,
    );
  }

  @Get('/')
  async listFranchise(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'listFranchise',
      data,
    );
  }

  @Get('/:id/statement')
  async getFranchiseStatement(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query, id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'getFranchiseStatement',
      data,
    );
  }

  @Get('/location')
  async listFranchiseLocation(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'listFranchiseLocation',
      data,
    );
  }

  @Get('/inspection_workshop')
  async listWorkshopStaff(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'listWorkshopStaff',
      data,
    );
  }

  @Put('/:id')
  async updateFranchise(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.body, id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'updateFranchise',
      data,
    );
  }

  @Get('/:id')
  async getFranchiseById(@Req() req: Request, @Res() res: Response) {
    const data: any = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'getFranchiseById',
      data,
    );
  }

  @Get('/:id/wallet')
  async getFranchiseWallet(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query, id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'getFranchiseWallet',
      data,
    );
  }

  @Post('/wallet')
  async createFranchiseWallet(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.send(
      req,
      res,
      TYPES.WALLET_SVC,
      'createWallet',
      req.body,
    );
  }

  @Put('/:franchise_id/status')
  async updateFranchiseStatus(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.body, franchise_id: req.params.franchise_id };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'updateFranchiseStatus',
      data,
    );
  }

  @Get('/:franchise_id/document')
  async listFranchiseDocument(@Req() req: Request, @Res() res: Response) {
    const data: any = { franchise_id: req.params.franchise_id, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'listFranchiseDocument',
      data,
    );
  }

  @Post('/document')
  async createFranchiseDocument(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'createFranchiseDocument',
      data,
    );
  }

  @Post('/document/:id')
  async updateFranchiseDocument(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.body, id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'updateFranchiseDocument',
      data,
    );
  }

  @Delete('/document/:id')
  async deleteFranchiseDocument(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.params };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'deleteFranchiseDocument',
      data,
    );
  }

  @Put('/document/:document_id/status')
  async updateDocStatus(@Req() req: Request, @Res() res: Response) {
    const data: any = { document_id: req.params, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'updateDocStatus',
      data,
    );
  }

  @Get('/:franchise_id/customers')
  async listCustomers(@Req() req: Request, @Res() res: Response) {
    const data: any = { franchise_id: req.params.franchise_id, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'listCustomers',
      data,
    );
  }

  @Post('/:franchise_id/staff')
  async addStaff(@Req() req: Request, @Res() res: Response) {
    const data: any = { franchise_id: req.params.franchise_id, ...req.body };
    return this.proxyService.send(req, res, TYPES.USER_SVC, 'addStaff', data);
  }

  @Get('/:franchise_id/staff')
  async getStaff(@Req() req: Request, @Res() res: Response) {
    const data: any = { franchise_id: req.params.franchise_id, ...req.query };
    return this.proxyService.send(req, res, TYPES.USER_SVC, 'getStaff', data);
  }

  @Post('/contract/hook')
  async contractHook(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'contractHook',
      req.body,
    );
  }
}
