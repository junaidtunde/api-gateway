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
export class LocationController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Get('/country')
  async listCountry(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'listCountry',
      data,
    );
  }

  @Get('/country/:id')
  async getCountry(@Req() req: Request, @Res() res: Response) {
    const data: any = { id: req.params.id };
    return this.proxyService.send(req, res, TYPES.USER_SVC, 'getCountry', data);
  }

  @Get('/state')
  async listState(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query };
    return this.proxyService.send(req, res, TYPES.USER_SVC, 'listState', data);
  }

  @Get('/city')
  async listCity(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query };
    return this.proxyService.send(req, res, TYPES.USER_SVC, 'listCity', data);
  }

  @Post('/country')
  async createCountry(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'createCountry',
      data,
    );
  }

  @Post('/state')
  async createState(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'createState',
      data,
    );
  }

  @Post('/city')
  async createCity(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.body };
    return this.proxyService.send(req, res, TYPES.USER_SVC, 'createCity', data);
  }

  @Post('/center')
  async createCenter(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'createCenter',
      data,
    );
  }

  @Get('/center')
  async listCenter(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query };
    return this.proxyService.send(req, res, TYPES.USER_SVC, 'listCenter', data);
  }

  @Get('/location/:id')
  async getUserLocationById(@Req() req: Request, @Res() res: Response) {
    const data: any = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'getUserLocationById',
      data,
    );
  }
}
