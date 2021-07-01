import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { TYPES } from 'types';
import { ProxyService } from '../proxy';

@Injectable()
export class GraphQLMiddleware implements NestMiddleware {
  constructor(private readonly proxyService: ProxyService) {}

  async use(req: Request, res: Response, next: () => any) {
    if (req.body.operationName === 'IntrospectionQuery') {
      return next();
    }

    let cmd = '';
    if (req.url === '/car/graphql') {
      cmd = 'carRawQuery';
    } else if (req.url === '/inspection/graphql') {
      cmd = 'inspectionRawQuery';
    } else if (req.url === '/auction/graphql') {
      cmd = 'auctionRawQuery';
    } else if (req.url === '/search/graphql') {
      cmd = 'searchRawQuery';
    } else if (req.url === '/document/graphql') {
      cmd = 'documentRawQuery';
    } else if (req.url === '/cardata/graphql') {
      cmd = 'cardataRawQuery';
    } else {
      return res.status(404);
    }

    //   return this.proxyService.send(
    //     req,
    //     res,
    //     TYPES.INVENTORY_SVC,
    //     cmd,
    //     req.body.query,
    //   );
  }
}
