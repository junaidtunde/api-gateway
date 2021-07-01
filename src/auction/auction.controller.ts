import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';

@Controller('/v1/auction')
export class AuctionController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}

  @Post('/config')
  async createConfig(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'createAuctionConfiguration',
      req.body,
    );
  }

  @Put('/config/:id')
  async updateConfig(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'updateAuctionConfiguration',
      data,
    );
  }

  @Get('/config')
  async listConfigs(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'listAuctionConfiguration',
    );
  }

  @Delete('/config/:id')
  async deleteConfig(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'deleteAuctionConfiguration',
      data,
    );
  }

  @Post('/')
  async createAuction(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'createAuction',
      req.body,
    );
  }

  @Put('/:id')
  async updateAuction(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'updateAuction',
      data,
    );
  }

  @Get('/')
  async listAuctions(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { ...req.query } as any;

    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'listAuction',
      data,
    );
  }

  @Get('/user')
  async listUserAuction(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'listUserAuction',
      {},
    );
  }

  @Get('/car')
  async listAuctionCars(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'listAuctionCars',
      data,
    );
  }

  @Delete('/:id')
  async deleteAuction(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'deleteAuction',
      data,
    );
  }

  @Get('/upcoming/:user_id')
  async upcomingAuction(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { user_id: req.params.user_id };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'upcomingAuction',
      data,
    );
  }

  @Post('/bid')
  async createAuctionBid(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'createAuctionBid',
      req.body,
    );
  }

  @Get('/:auction_id/bid/:user_id')
  async listAuctionBid(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { ...req.params };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'listAuctionBid',
      data,
    );
  }

  @Post('/view')
  async createAuctionView(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'createAuctionView',
      req.body,
    );
  }

  @Post('/autobid')
  async createAutoBid(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'createAutoBid',
      req.body,
    );
  }

  @Post('/bid/accept')
  async acceptBid(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = {
      auction_id: req.body.auction_id,
    };

    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'acceptBid',
      data,
    );
  }

  @Post('/:auction_id/bid/reject')
  async rejectBid(@Req() req: Request, @Res() res: Response): Promise<any> {
    const userData: any = req.headers.user;
    const parsedUserData = JSON.parse(userData);
    const data = {
      auction_id: req.params.auction_id,
      user_id: parsedUserData.id,
      ...req.body,
    };

    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'rejectBid',
      data,
    );
  }

  @Get('/:auction_id')
  async getAuction(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.auction_id, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'getAuction',
      data,
    );
  }

  @Get('/:auction_id/service_fees')
  async listServiceFees(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { auction_id: req.params.auction_id, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'listServiceFees',
      data,
    );
  }

  @Post('/new_offer')
  async newOffer(@Req() req: Request, @Res() res: Response): Promise<any> {
    const userData: any = req.headers.user;
    const parsedUserData = JSON.parse(userData);
    const data = {
      user_id: parsedUserData.id,
      ...req.body,
    };

    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'newOffer',
      data,
    );
  }

  @Post('/buynow')
  async buyNow(@Req() req: Request, @Res() res: Response): Promise<any> {
    const userData: any = req.headers.user;
    const parsedUserData = JSON.parse(userData);
    const data = {
      user_id: parsedUserData.id,
      ...req.body,
    };

    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'createAuctionBuyNow',
      data,
    );
  }

  @Get('/:auction_id/winner')
  async getWinningAuction(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { auction_id: req.params.auction_id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.AUCTION_SVC,
      'getWinningAuction',
      data,
    );
  }
}
