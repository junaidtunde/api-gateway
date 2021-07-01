import { AuthorizationService } from '../authorization/authorization.service';
import { CacheService } from '../cache/cache.service';

export default async (
  cacheService: CacheService,
  authSvc: AuthorizationService,
  req,
): Promise<{ token: string; secret: string }> => {
  let secret = await cacheService.get('app::secret');
  if (!secret) {
    await authSvc.getSecretKey();
    secret = await cacheService.get('app::secret');
  }

  const headers = req.headers;
  if (headers.authorization === undefined) {
    throw new Error('no authorization header');
  }

  const token = headers.authorization.split(' ')[1];
  if (token === undefined) {
    throw new Error('no authorization token present');
  }
  return { token, secret };
};
