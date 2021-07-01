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
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';

@ApiHeader({
  name: 'CRM',
  description: 'Bearer <token>',
})
@Controller('/v1/crm')
export class CrmLeadController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Post('/lead')
  async createLead(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = { ...req.body };
    return this.proxyService.send(req, res, TYPES.CRM_SVC, 'createLead', data);
  }

  @Get('/lead')
  async fetchAllLeads(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(req, res, TYPES.CRM_SVC, 'fetchLeads', data);
  }

  @Get('/lead/:id')
  async fetchOneLead(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = { ...req.params };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'fetchLeadById',
      data,
    );
  }

  @Put('/lead/:id')
  async updateLead(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = { ...req.body, ...req.params };
    return this.proxyService.send(req, res, TYPES.CRM_SVC, 'updateLead', data);
  }

  @Delete('/lead/:id')
  async deleteLead(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = { ...req.params };
    return this.proxyService.send(req, res, TYPES.CRM_SVC, 'deleteLead', data);
  }

  @Get('/schedules')
  async fetchSchedule(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'fetchSchedule',
      data,
    );
  }

  @Get('/lead/:id/service-interest')
  async fetchServiceInterest(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'fetchServiceInterest',
      data,
    );
  }

  @Put('/service-interest/:id')
  async updateServiceInterest(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'updateServiceInterest',
      data,
    );
  }

  @Delete('/service-interest/:id')
  async deleteServiceInterest(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'deleteServiceInterest',
      data,
    );
  }

  @Put('/lead/:id/link-user')
  async mapLeadToUser(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = { ...req.params, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'mapLeadToUser',
      data,
    );
  }
  @Post('/map-user/:user_id')
  async mapUserToLead(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = { ...req.params, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'mapUserToLead',
      data,
    );
  }

  @Get('/note')
  async fetchLeadNotes(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(req, res, TYPES.CRM_SVC, 'fetchNote', data);
  }
  @Post('/note')
  async createLeadNote(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'createNote',
      req.body,
    );
  }
  @Put('/note/:id')
  async updateLeadNote(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.body, ...req.params };
    return this.proxyService.send(req, res, TYPES.CRM_SVC, 'updateNote', data);
  }
  @Delete('/note/:id')
  async deleteLeadNote(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params };
    return this.proxyService.send(req, res, TYPES.CRM_SVC, 'deleteNote', data);
  }
  @Post('/loan-lead')
  async upsertLoanData(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'upsertLoanData',
      req.body,
    );
  }
}
