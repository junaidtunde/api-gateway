import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MFBLoanController } from './loan/mfb-loan.controller';

import { AuctionController } from './auction/auction.controller';
import { AuthorizationController } from './authorization/authorization.controller';
import { AuthorizationService } from './authorization/authorization.service';
import { FacebookStrategy } from './authorization/social-strategy/facebook.strategy';
import { GoogleStrategy } from './authorization/social-strategy/google.strategy';
import { CacheModule } from './cache/cache.module';
import { CrmAgentController } from './crm/agent.controller';
import { CrmAppointmentController } from './crm/appointment.controller';
import { CrmLeadController } from './crm/lead.controller';
import { CrmNotificationController } from './crm/notification.controller';
import { HomeController } from './home/home.controller';
import { CMSController } from './inventory/cms.controller';
import { InspectionConfigController } from './inventory/inspection-config.controller';
import { InspectionController } from './inventory/inspection.controller';
import { InventoryController } from './inventory/inventory.controller';
import { LoanController } from './loan/loan.controller';
import { LogisticsController } from './logistics/logistics.controller';
import { microservices } from './microservices.import';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { NotificationController } from './notification/notification.controller';
import { OrdersController } from './orders/orders.controller';
import PaymentsHelper from './orders/payments.helper';
import { ProxyService } from './proxy';
import { FranchiseController } from './user/franchise.controller';
import { LocationController } from './user/location.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ...microservices,
    CacheModule,
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'finance_docs'),
      exclude: ['*'],
    }),
  ],
  controllers: [
    UserController,
    CrmLeadController,
    CrmAgentController,
    CrmAppointmentController,
    CrmNotificationController,
    InventoryController,
    AuthorizationController,
    LogisticsController,
    OrdersController,
    HomeController,
    AuctionController,
    CMSController,
    InspectionController,
    FranchiseController,
    InspectionConfigController,
    LoanController,
    LocationController,
    NotificationController,
    MFBLoanController,
  ],
  providers: [
    AuthorizationService,
    ProxyService,
    PaymentsHelper,
    FacebookStrategy,
    GoogleStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/v1/auth/login', method: RequestMethod.POST },
        { path: '/v1/auth/register', method: RequestMethod.POST },
        { path: '/v1/auth/login/otp', method: RequestMethod.POST },
        { path: '/docs/login', method: RequestMethod.GET },
        { path: '/finance/(.*)', method: RequestMethod.GET },
        { path: '/payments', method: RequestMethod.GET },
        { path: '/whatsapp', method: RequestMethod.POST },
        { path: '/get-my-location', method: RequestMethod.GET },
        { path: '/health', method: RequestMethod.GET },
        { path: '/metrics', method: RequestMethod.GET },
        { path: '/v1/dealership/contract/hook', method: RequestMethod.POST },
        { path: '/v1/inventory/marketplace/colors', method: RequestMethod.GET },
        { path: '/v1/inventory/car/image_html', method: RequestMethod.GET },
        { path: '/v1/inventory/car/search', method: RequestMethod.GET },
        { path: '/v1/inventory/car/:id', method: RequestMethod.GET },
        { path: '/v1/inventory/body_type', method: RequestMethod.GET },
        { path: '/v1/inventory/category', method: RequestMethod.GET },
        { path: '/v1/inventory/make', method: RequestMethod.GET },
        { path: '/v1/inventory/feature', method: RequestMethod.GET },
        { path: '/v1/inventory/car_feature', method: RequestMethod.GET },
        { path: '/v1/inventory/model', method: RequestMethod.GET },
        { path: '/v1/inventory/car_media', method: RequestMethod.GET },
        { path: '/v1/inventory/car/:id/similar', method: RequestMethod.GET },
        {
          path: '/v1/inventory/car/:id/deposit_amount',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/auth/facebook',
          method: RequestMethod.POST,
        },
        {
          path: '/v1/auth/google',
          method: RequestMethod.POST,
        },
        {
          path: '/v1/auth/truecaller',
          method: RequestMethod.POST,
        },
        { path: '/v1/user/email/verify', method: RequestMethod.POST },
        { path: '/v1/user/phone/verify', method: RequestMethod.POST },
        {
          path: '/v1/inventory/car/:id/inspection/marketplace',
          method: RequestMethod.GET,
        },
        {
          path: '/v1/orders/payments/webhook',
          method: RequestMethod.POST,
        },
        { path: '/v1/country', method: RequestMethod.GET },
        { path: '/v1/country/:id', method: RequestMethod.GET },
        { path: '/v1/state', method: RequestMethod.GET },
        { path: '/v1/city', method: RequestMethod.GET },
        { path: '/v1/franchise/location', method: RequestMethod.GET },
        { path: '/v1/orders/marketplace/buy', method: RequestMethod.POST },
        { path: '/v1/orders/logistics', method: RequestMethod.POST },
        { path: '/v1/logistics/get-order/:id', method: RequestMethod.GET },
        {
          path: '/v1/orders/marketplace/inspection',
          method: RequestMethod.POST,
        },
        { path: '/v1/orders/loan/deposit', method: RequestMethod.POST },
        { path: '/v1/orders/currency/rates', method: RequestMethod.GET },
        { path: '/v1/crm/lead/appointment', method: RequestMethod.POST },
        { path: '/v1/logistics/get_pricing', method: RequestMethod.GET },
        { path: '/v1/crm/lead/appointment', method: RequestMethod.POST },

        { path: '/v1/loan/add_mono_code', method: RequestMethod.POST },
        { path: '/v1/loan/okra/callback', method: RequestMethod.POST },
        { path: '/v1/loan/mono/callback', method: RequestMethod.POST },
        { path: '/v1/loan/corporate-partners', method: RequestMethod.GET },
        { path: '/v1/loan/corporate-partners', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
