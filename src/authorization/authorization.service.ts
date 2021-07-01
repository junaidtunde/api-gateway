import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { CacheService } from '../cache/cache.service';
import { TYPES } from '../types';
import { getCountryCode, getMetadata } from '../utils/helpers';

@Injectable()
export class AuthorizationService {
  private readonly userSvc: any;
  private readonly authSvc: any;

  constructor(
    @Inject(TYPES.USER_SVC) private readonly userClient: ClientGrpc,
    @Inject(TYPES.AUTHORIZATION_SVC) private readonly authClient: ClientGrpc,
    @Inject(CacheService) private readonly cacheService: CacheService,
    private httpService: HttpService,
  ) {
    this.userSvc = this.userClient.getService('UserService');
    this.authSvc = this.authClient.getService('AuthorizationService');
  }

  seedResources(application): Observable<any> {
    const availableRoutes: string[] = application.httpAdapter.instance._router.stack
      .filter((r) => r.route)
      .map(
        (r) =>
          Object.keys(r.route.methods)[0].toUpperCase().padEnd(7) +
          r.route.path,
      );

    const resources = availableRoutes.map((doc) => {
      const array = doc
        .split(' ')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      return {
        id: array.join('-').replace(/\//g, '-').toLowerCase(),
        name: array.join(' '),
        url: array.join(' '),
      };
    });
    return this.authSvc.createResource({ list: resources });
  }

  async getSecretKey(): Promise<string> {
    const { secret } = await this.authSvc.getSecret({}).toPromise();
    await this.cacheService.save('app::secret', secret);
    return secret;
  }

  async login(data: any): Promise<any> {
    const response = await this.authSvc.loginUser(data).toPromise();
    return response;
  }

  async verifyOTP(headers: any, data: any): Promise<any> {
    const ip = headers['x-forwarded-for'] as string;
    const countryCode = getCountryCode(ip);
    const metadata = {
      user: headers.user ? headers.user : '{}',
      country_code: countryCode,
      request_id: uuidv4(),
    };
    const grpcMetadata = getMetadata(metadata);
    const response = await this.authSvc
      .verifyOTP(data, grpcMetadata)
      .toPromise();
    return response;
  }

  async createUserDetails(data): Promise<any> {
    let response = await this.userSvc
      .getUserBySocialIdOrEmail(data)
      .toPromise();

    if (!response || !response.id) {
      response = await this.createNewuser(data);
    }

    const userId = response.id;

    const token = await this.generateToken(userId);

    return {
      token,
      user: response,
    };
  }

  async createNewuser(data) {
    const createUserPayload = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      facebookId: data.facebookId,
      googleId: data.googleId,
      primaryPhone: data.phoneNumber,
    };
    try {
      const newUser = await this.userSvc
        .createUser(createUserPayload)
        .toPromise();

      return newUser;
    } catch (error) {
      Logger.log(error);
    }
  }

  async generateToken(userId) {
    try {
      const secret = await this.getSecretKey();

      return jwt.sign({ userId }, secret, {
        algorithm: 'HS512',
        expiresIn: '365d',
      });
    } catch (error) {
      Logger.log(error);
    }
  }

  async getUserAuthority(userId: string) {
    let user: any = await this.cacheService.get(`app::user::${userId}`);
    if (!user) {
      user = await this.userSvc.getUserById({ id: userId }).toPromise();
      const auth = await this.authSvc
        .getUserAuthority({ id: userId })
        .toPromise();
      user.roles = auth.roles;
      user.permissions = auth.permissions;
      await this.cacheService.save(
        `app::user::${userId}`,
        JSON.stringify(user),
        600,
      );
    }

    user = JSON.parse(JSON.stringify(user));
    return user;
  }

  async logout(userId: string) {
    await this.cacheService.remove(`app::user::${userId}`);
  }

  async getResourcePermissions() {
    try {
      const { result } = await this.authSvc
        .getResourcePermissions({})
        .toPromise();
      await this.cacheService.save(
        `app::resource-permissions`,
        JSON.stringify(result),
      );
    } catch (err) {
      Logger.error(err, 'Error fetching resource permissions ');
    }
  }

  async getTruecallerProfile(accessToken: string) {
    try {
      const profile = await this.httpService
        .get('https://profile4.truecaller.com/v1/default', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .toPromise();

      return profile;
    } catch (error) {
      throw new RpcException(error.response.data.message);
    }
  }

  async applySoftAuth(req: Request): Promise<void> {
    try {
      const token =
        req.signedCookies && req.signedCookies.accessToken
          ? req.signedCookies.accessToken
          : req.headers.authorization &&
            req.headers.authorization.split(' ')[1];
      if (!token) return null;
      let secret = await this.cacheService.get('app::secret');
      if (!secret) {
        secret = await this.getSecretKey();
      }
      const { userId } = jwt.verify(token, secret, { algorithm: 'HS512' });
      let user = await this.getUserAuthority(userId);
      user = typeof user === 'string' ? JSON.parse(user) : user;
      req.headers.user = JSON.stringify({
        id: user.id,
        roles: user.roles,
        permissions: user.permissions,
      });
    } catch (err) {
      Logger.warn(
        `Soft authentication failed, not a big concern, error reads: ${err.message}`,
      );
    }
  }
}
