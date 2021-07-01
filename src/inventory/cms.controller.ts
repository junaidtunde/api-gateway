import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { FileUploadInterceptor } from '../interceptor/file-upload.interceptor';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';
import { mapFileName } from '../utils/helpers';

@ApiTags('/cms')
@Controller('/v1/cms')
export class CMSController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
  ) {}
  @Post('/article_category')
  async createArticleCategory(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createArticleCategory',
      req.body,
    );
  }

  @Put('/article_category/:id')
  async updateArticleCategory(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateArticleCategory',
      data,
    );
  }

  @Delete('/article_category/:id')
  async deleteArticleCategory(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteArticleCategory',
      { id: req.params.id },
    );
  }

  @Get('/article_category/:id')
  async readArticleCategory(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readArticleCategory',
      { id: req.params.id },
    );
  }

  @Get('/article_category')
  async listArticleCategory(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listArticleCategory',
      body,
    );
  }

  @Post('/article_media')
  async createArticleMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createArticleMedia',
      req.body,
    );
  }

  @Put('/article_media/:id')
  async updateArticleMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateArticleMedia',
      data,
    );
  }

  @Delete('/article_media/:id')
  async deleteArticleMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteArticleMedia',
      { id: req.params.id },
    );
  }

  @Get('/article_media/:id')
  async readArticleMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readArticleMedia',
      { id: req.params.id },
    );
  }

  @Get('/article_media')
  async getAllMedia(@Req() req: Request, @Res() res: Response): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listArticleMedia',
      body,
    );
  }

  @Post('/article_tag')
  async createArticleTag(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createArticleTag',
      req.body,
    );
  }

  @Put('/article_tag/:id')
  async updateArticleTag(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateArticleTag',
      data,
    );
  }

  @Delete('/article_tag/:id')
  async deleteArticleTag(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteArticleTag',
      { id: req.params.id },
    );
  }

  @Get('/article_tag/:id')
  async readArticleTag(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readArticleTag',
      { id: req.params.id },
    );
  }

  @Get('/article_tag')
  async getAllTag(@Req() req: Request, @Res() res: Response): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listArticleTag',
      body,
    );
  }

  @Post('/article')
  async createArticle(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createArticle',
      req.body,
    );
  }

  @Put('/article/:id')
  async updateArticle(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateArticle',
      data,
    );
  }

  @Delete('/article/:id')
  async deleteArticle(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteArticle',
      { id: req.params.id },
    );
  }

  @Get('/article/:id')
  async readArticle(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readArticle',
      { id: req.params.id },
    );
  }

  @Get('/article')
  async getAllArticle(@Req() req: Request, @Res() res: Response): Promise<any> {
    const body: any = req.query;

    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listArticle',
      body,
    );
  }
}
