import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';
import { CacheService } from '../cache/cache.service';
import JwtTokenHelper from '../utils/jwt-token.helper';

@Injectable()
export class PermissionGuard implements CanActivate {
  private requestObject;
  constructor(
    @Inject(CacheService) private readonly cacheService: CacheService,
    @Inject(AuthorizationService)
    private readonly authSvc: AuthorizationService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    this.requestObject = request;
    return this.validateRequest(request);
  }

  async getUserFromJwt() {
    const jwtData = await JwtTokenHelper(
      this.cacheService,
      this.authSvc,
      this.requestObject,
    );
    const { secret, token } = jwtData;
    const jwtResult = jwt.verify(token, secret, { algorithm: 'HS512' });
    const user = await this.authSvc.getUserAuthority(jwtResult.userId);
    return JSON.parse(user);
  }

  checkUserPermissions(user, currentResource): boolean {
    return !!user.permissions.includes(currentResource.permission);
  }

  async validateRequest(request): Promise<boolean> {
    if (request.headers.user) {
      const { id } = JSON.parse(request.headers.user);

      const isForceLogout = await this.cacheService.get(`app::block::${id}`);
      if (isForceLogout) {
        await this.cacheService.remove(`app::user::${id}`);
        throw new UnauthorizedException();
      }
    }

    const result = await this.cacheService.get(`app::resource-permissions`);
    const resourcePermissions = JSON.parse(result);

    // tslint:disable-next-line: no-string-literal
    const url = `${request['method']} ${request.route.path}`;

    const currentResource = resourcePermissions.find((doc) => doc.url === url);

    if (!currentResource) {
      return false;
    } else if (!currentResource.permission) {
      return true;
    } else {
      let user;
      const userString = request.headers.user;

      if (userString) {
        user =
          typeof userString === 'string'
            ? JSON.parse(userString)
            : JSON.parse(JSON.stringify(userString));
      } else {
        return false;
      }

      if (
        user.permissions &&
        user.permissions.includes(currentResource.permission)
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
}
