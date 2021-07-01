import { Controller, Get, Inject, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';

@Controller('/v1/notifications')
export class NotificationController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Get('/')
  async getUserNotifications(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.NOTIFICATION_SVC,
      'getUserNotifications',
      body,
    );
  }

  @Put('/:id')
  async markAsRead(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.NOTIFICATION_SVC,
      'markAsRead',
      req.params,
    );
  }
}
