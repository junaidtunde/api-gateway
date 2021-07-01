import { Controller, Get, Inject, Put, Req, Res } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';

@ApiHeader({
  name: 'CRM',
  description: 'Bearer <token>',
})
@Controller('/v1/crm')
export class CrmNotificationController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Get('/notifications')
  async fetchNotifications(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'fetchNotification',
      data,
    );
  }
  @Put('/notification/:id')
  async updateNotification(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'updateNotification',
      data,
    );
  }
}
