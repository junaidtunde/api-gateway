import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import * as truecaller from '@vyng/truecaller-node';
import { Request, Response } from 'express';
import { CacheService } from '../cache/cache.service';
import { config } from '../config';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';
import { handleError, success } from '../utils/responses';
import { AuthorizationService } from './authorization.service';

@Controller('/v1/auth')
export class AuthorizationController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
    @Inject(AuthorizationService)
    private readonly authService: AuthorizationService,
    @Inject(CacheService)
    private readonly cacheService: CacheService,
  ) {}

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const response = await this.authService.login(req.body);

      await this.cacheService.remove(`app::block::${response.user.id}`);
      return res
        .status(200)
        .cookie('accessToken', response.token, {
          signed: true,
          domain: config.isDevelopment ? '.myautochek.com' : '.autochek.africa',
        })
        .json(response);
    } catch (err) {
      handleError(res, err.message);
    }
  }

  @Post('/force-logout')
  async forceLogout(@Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      const userId = req.body.userId;
      await this.cacheService.save(`app::block::${userId}`, userId);
      res.send({ success: true });
    } catch (err) {
      handleError(res, err.message);
    }
  }

  @Post('/login/otp')
  async loginNoPassword(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    res.clearCookie('accessToken');
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'loginUserOtp',
      req.body,
    );
  }

  @Post('/login/otp/verify')
  async verifyNoPassword(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const response = await this.authService.verifyOTP(req.headers, req.body);

      return res
        .status(200)
        .cookie('accessToken', response.token, { signed: true })
        .json(response);
    } catch (err) {
      handleError(res, err.message);
    }
  }

  @Post('/facebook')
  @UseGuards(AuthGuard('facebook-token'))
  async facebookLoginRedirect(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const userDetails = req.user as any;
      const response = await this.authService.createUserDetails({
        email: userDetails.email,
        facebookId: userDetails.facebookId,
        firstname: userDetails.firstName,
        lastname: userDetails.lastName,
      });

      return res
        .status(200)
        .cookie('accessToken', response.token, { signed: true })
        .json(response);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @Post('/google')
  @UseGuards(AuthGuard('google-id-token'))
  async googleLoginRedirect(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const userDetails = req.user as any;
      const response = await this.authService.createUserDetails({
        email: userDetails.email,
        googleId: userDetails.googleId,
        firstname: userDetails.firstName,
        lastname: userDetails.lastName,
      });

      return res
        .status(200)
        .cookie('accessToken', response.token, { signed: true })
        .json(response);
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @Post('/truecaller')
  async truecallerLogin(@Req() req: any, @Res() res: Response): Promise<any> {
    try {
      const profile = await truecaller.verifyProfile(req.body.profile);
      if (profile.firstName) {
        const userData = {
          email: profile.email,
          phoneNumber: profile.phoneNumber,
          firstname: profile.firstName,
          lastname: profile.lastName,
        };
        const response = await this.authService.createUserDetails(userData);
        return res
          .status(200)
          .cookie('accessToken', response.token, { signed: true })
          .json(response);
      }
    } catch (err) {
      throw new RpcException(err.message);
    }
  }

  @Post('/register')
  async register(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'registerUser',
      req.body,
    );
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<any> {
    const reqq = req as any;
    const user: any = JSON.parse(JSON.stringify(reqq.headers.user));
    await this.authService.logout(user.id);
    return success(res, 'user logged out');
  }

  @Get('/resource')
  async ListResources(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'listResources',
      {},
    );
  }

  @Post('/permission')
  async createPermission(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'createPermission',
      req.body,
    );
  }

  @Get('/permission')
  async listPermissions(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'listPermission',
      data,
    );
  }

  @Put('/permission/:id')
  async updatePermission(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'updatePermission',
      data,
    );
  }

  @Delete('/permission/:id')
  async deletePermission(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'deletePermission',
      { id: req.params.id },
    );
  }

  @Get('/role')
  async listRoles(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'listRoles',
      data,
    );
  }

  @Post('/role')
  async createRole(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'createRole',
      req.body,
    );
  }

  @Put('/role/:id')
  async updateRole(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, name: req.body.name };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'updateRole',
      data,
    );
  }

  @Get('/role/:id')
  async findRole(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'getRole',
      data,
    );
  }

  @Delete('/role/:id')
  async deleteRole(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'deleteRole',
      { id: req.params.id },
    );
  }

  @Put('/role/:id/update_permissions')
  async updatePermissions(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = Object.assign({}, { ...req.body }, { id: req.params.id });
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'updateRolePermissions',
      data,
    );
  }

  @Put('/update-password')
  async updatePassword(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'updatePassword',
      data,
    );
  }

  @Put('/user/:id/update_roles')
  async updateUserRoles(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUTHORIZATION_SVC,
      'updateUserRoles',
      data,
    );
  }
}
