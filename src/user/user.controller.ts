import { Controller, Get, Inject, Post, Put, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ProxyService } from '../proxy';
import { ResponseDto, TYPES } from '../types';
import { UserDto } from './dtos/user.dto';

@Controller('/v1/user')
export class UserController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Get('/my_cars')
  async getUserCars(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listUserCar',
      data,
    );
  }

  @Get('/franchise_cars')
  async getFranchiseCars(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listFranchiseCar',
      data,
    );
  }

  @Put('/update_profile')
  async updateUserSelf(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'updateUserSelf',
      data,
    );
  }
  @Get('/favorite-cars')
  async listUserFavouriteCars(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listUserFavouriteCars',
      data,
    );
  }

  @Get('/favorites/car_ids')
  async ListUserFavouriteCarIds(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listUserFavouriteCarIds',
    );
  }

  @Get('/')
  async listAll(@Req() req: Request, @Res() res: Response) {
    const data = { ...req.query } as any;
    return this.proxyService.send(req, res, TYPES.USER_SVC, 'listUsers', data);
  }

  @Get('/:id')
  async findById(@Req() req: Request, @Res() res: Response) {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'getUserById',
      data,
    );
  }

  @Post('/email/verify')
  async verifyEmail(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'verifyEmail',
      req.body,
    );
  }

  @Post('/phone/verify')
  async verifyPhone(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'verifyPhone',
      req.body,
    );
  }

  @Post('/')
  async create(@Req() req: Request, @Res() res: Response) {
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'createUser',
      req.body,
    );
  }

  @Put('/:id')
  async update(@Req() req: Request, @Res() res: Response) {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(req, res, TYPES.USER_SVC, 'updateUser', data);
  }

  @Get('/referrals/:code')
  async getUserReferrals(@Req() req: Request, @Res() res: Response) {
    const data: any = { ...req.params, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'getUserReferrals',
      data,
    );
  }

  @Put('/referral/:id')
  async updateUserReferrals(@Req() req: Request, @Res() res: Response) {
    const data = { ...req.params, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'updateUserReferral',
      data,
    );
  }

  @Put('/:userId/franchise')
  async removeFranchiseStaff(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'removeStaff',
      data,
    );
  }

  @Put('/favorite-cars/:carId')
  async addorRemoveFavoriteCar(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.params };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'addorRemoveFavoriteCar',
      data,
    );
  }

  /** Device token Endpoints Starts */
  @Post('/fcm_token')
  async createOrUpdateToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'createOrUpdateToken',
      req.body,
    );
  }

  @Post('/fcm_token/status')
  async updateDeviceTokenStatus(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.USER_SVC,
      'updateDeviceTokenStatus',
      data,
    );
  }
  /**  Device token Endpoints Ends */
}
