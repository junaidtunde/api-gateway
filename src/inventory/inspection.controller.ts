import {
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { query, Request, Response } from 'express';
import { FileUploadInterceptor } from '../interceptor/file-upload.interceptor';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';
import { generatePdf } from '../utils/helpers';
import { handleError } from '../utils/responses';

@Controller('/v1/inspection')
export class InspectionController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Post('/')
  async createInspection(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createInspection',
      req.body,
    );
  }

  @Put('/:id')
  async updateInspection(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateInspection',
      data,
    );
  }

  @Get('/report')
  async GenerateInspectionReport(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const pdf = await generatePdf(
        decodeURIComponent(req.query.reportUrl as string),
      );
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Length': pdf.length,
      });
      res.send(pdf);
    } catch (error) {
      Logger.error(error.message);
      handleError(res, error.message);
    }
  }

  @Get('/pdf-report')
  async GenerateInspectionPDFReport(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'generateInspectionReport',
      data,
    );
  }

  @Get('/:id')
  async getInspection(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'getInspection',
      data,
    );
  }

  @Get('/:id/re-calculate')
  async calculateInspectionScore(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'calculateInspectionScore',
      data,
    );
  }

  @Delete('/:id')
  async deleteInspection(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteInspection',
      { id: req.params.id },
    );
  }

  @Get('/')
  async getAllInspection(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listInspection',
      body,
    );
  }

  @Post('/:inspection_id/feedback')
  async createInspectionFeedback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { inspection_id: req.params.inspection_id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createInspectionFeedback',
      data,
    );
  }

  @Put('/:inspection_id/feedback/:id')
  async updateInspectionFeedback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { inspection_id: req.params.inspection_id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateInspectionFeedback',
      data,
    );
  }

  @Get('/:inspection_id/feedback')
  async listInspectionFeedback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { inspection_id: req.params.inspection_id };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listInspectionFeedback',
      data,
    );
  }

  @Put('/:inspection_id/status')
  async UpdateInspectionStatus(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { inspection_id: req.params.inspection_id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateInspectionStatus',
      data,
    );
  }
}
