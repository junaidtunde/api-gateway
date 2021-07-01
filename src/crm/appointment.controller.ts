import { Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';

@ApiHeader({
  name: 'CRM',
  description: 'Bearer <token>',
})
@Controller('/v1/crm')
export class CrmAppointmentController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Post('/lead/appointment')
  async createLeadAppointment(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.CRM_SVC,
      'createLeadAppointment',
      req.body,
    );
  }
}
