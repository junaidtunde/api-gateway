import { Logger } from '@nestjs/common';
import * as RedisConnect from 'connect-redis';
import { Request, Response } from 'express';
import * as session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import { CacheService } from '../cache/cache.service';
import { config } from '../config';

const RedisConnectStore = RedisConnect(session);

export function autochekTokenMiddleware(
  req: Request,
  res: Response,
  next: () => any,
) {
  const token = req.signedCookies.autochekToken;

  const hundredYears = 100 * 365 * 24 * 60 * 60 * 1000;
  if (!token) {
    res.cookie('autochekToken', uuidv4(), {
      signed: true,
      expires: new Date(Date.now() + hundredYears),
      sameSite: false,
      secure: true,
      httpOnly: false,
      domain: config.isDevelopment ? '.myautochek.com' : '.autochek.africa',
    });
  }

  return next();
}

export function autochekSessionMiddleware(
  cacheService: CacheService,
  secret: string,
) {
  const store = new RedisConnectStore({ client: cacheService.getClient() });
  return session({
    store,
    saveUninitialized: true,
    secret,
    resave: false,
    cookie: {
      secure: true,
      sameSite: false,
      signed: true,
      httpOnly: false,
      domain: config.isDevelopment ? '.myautochek.com' : '.autochek.africa',
    },
    name: 'autochek.sid',
    proxy: true,
    rolling: true,
  });
}
