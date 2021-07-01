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
import { ApiHeader } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';

@ApiHeader({
  name: 'CRM',
  description: 'Bearer <token>',
})
@Controller('/v1/crm')
export class CrmAgentController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Get('/agent')
  async fetchAllAgents(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'getUsersByRoleId',
      data,
    );
  }
  @Put('/agent/:id')
  async updateAgentServiceArea(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'updateAgentServiceArea',
      data,
    );
  }
  @Delete('/agent/:id')
  async removeAgent(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'removeAgent',
      req.params,
    );
  }
  @Post('/agent/schedule-activity')
  async createSchedule(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'createSchedule',
      req.body,
    );
  }

  @Put('/agent/activity/:id')
  async updateSchedule(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { ...req.body, ...req.params };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'updateSchedule',
      data,
    );
  }

  @Delete('/agent/activity/:id')
  async deleteSchedule(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'deleteSchedule',
      req.params,
    );
  }
  @Post('/service')
  async createServiceRenderedOption(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'createServiceRenderedOption',
      req.body,
    );
  }
  @Put('/service/:id')
  async updateServiceRenderedOption(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'updateServiceRenderedOption',
      { ...req.body, ...req.params },
    );
  }
  @Get('/service')
  async getServiceRenderedOption(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'fetchServiceRenderedOptions',
      data,
    );
  }
  @Delete('/service/:id')
  async deleteServiceRenderedOption(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'deleteServiceRenderedOption',
      req.params,
    );
  }
  @Delete('/agent/:agent_id/lead/:lead_id')
  async removeAgentAssignment(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'removeAgentAssignment',
      req.params,
    );
  }
  @Post('/agent/bulk-assign')
  async bulkAssignLeads(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'bulkAssignLeads',
      req.body,
    );
  }
}
