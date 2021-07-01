/* tslint:disable: no-console */
import { AuthorizationService } from './authorization/authorization.service';

export async function resourceSeed(application) {
  const authService = application.get(AuthorizationService);
  await authService.seedResources(application).toPromise();
  setInterval(() => {
    authService.getResourcePermissions();
  }, 5000);
}
