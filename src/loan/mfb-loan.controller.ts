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
import { ProxyService } from '../proxy';
import { TYPES } from '../types';

@ApiHeader({
  name: 'Loan',
  description: 'Bearer <token>',
})
@Controller('/v1/mfb-loan')
export class MFBLoanController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Get('/')
  async getAllMfbLoan(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = {
      ...req.query,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getAllMfbLoan',
      data,
    );
  }

  @Get('/:id')
  async getSingleMfbLoan(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = {
      id: req.params.id,
    };
    return this.proxyService.send(
      req,
      res,
      TYPES.LOAN_SVC,
      'getSingleMfbLoan',
      data,
    );
  }
}
