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

@Controller('/v1')
export class InspectionConfigController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Post('/inspection_config')
  async createInspectionConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createInspectionConfig',
      req.body,
    );
  }

  @Put('/inspection_config/:id')
  async updateInspectionConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateInspectionConfig',
      data,
    );
  }

  @Delete('/inspection_config/:id')
  async deleteInspectionConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteInspectionConfig',
      { id: req.params.id },
    );
  }

  @Get('/my_country/inspection_config')
  async readInspectionConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'getInspectionConfigForCountry',
      { id: req.params.id, ...req.query },
    );
  }

  @Get('/inspection_config')
  async getAllInspectionConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listInspectionConfig',
      body,
    );
  }
}
