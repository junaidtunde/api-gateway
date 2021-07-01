import 'reflect-metadata';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as fileUpload from 'express-fileupload';
import * as RateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as RedisStore from 'rate-limit-redis';
import { AppModule } from './app.module';
import { AuthorizationService } from './authorization/authorization.service';
import { CacheService } from './cache/cache.service';
import { config } from './config';
import { constants } from './constants';
import { PermissionGuard } from './guard/permission.guard';
import {
  autochekSessionMiddleware,
  autochekTokenMiddleware,
} from './middlewares/authochek-token.middleware';
import { resourceSeed } from './resource.seed';

async function bootstrap() {
  const application = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const cacheService = application.get(CacheService);
  const authService = application.get(AuthorizationService);
  const secret = await authService.getSecretKey();
  application.set('trust proxy', 1);
  application.use(autochekSessionMiddleware(cacheService, secret));
  application.use(cookieParser(secret));
  application.use(autochekTokenMiddleware);
  application.useGlobalPipes(new ValidationPipe());
  application.useGlobalGuards(new PermissionGuard(cacheService, authService));
  application.use(bodyParser.json());
  application.use(
    fileUpload({
      limits: { fileSize: 100 * 1024 * 1024 }, // 50 MB
      useTempFiles: true,
      tempFileDir: '/tmp/',
      abortOnLimit: true,
    }),
  );

  const corsOption = {
    // origin: [
    //   'https://api.prod.myautochek.com',
    //   'https://api.staging.myautochek.com',
    //   'http://localhost:50050',
    //   'http://localhost:3000',
    // ],
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    exposedHeaders: ['set-cookie', 'Set-Cookie'],
  };

  application.enableCors(corsOption);

  // This allows us access external file for our Swagger docs, to fix later!
  application.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  /**
   * application rate limiting
   * the configuration below limits requests to a thousand requests per IP every 10 minutes
   */
  const limiter = new RateLimit({
    store: new RedisStore({
      redisURL: config.redisUrl,
    }),
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    skip: (req) => [...constants.MARKETPLACE_WEB_IPS].includes(req.ip),
  });
  application.use(limiter);

  await application.listen(config.port);
  Logger.log(`API gateway started on port ${config.port}`);

  resourceSeed(application);
}
bootstrap();
