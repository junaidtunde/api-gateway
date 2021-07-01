import {
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthorizationService } from '../authorization/authorization.service';
import { FileUploadInterceptor } from '../interceptor/file-upload.interceptor';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';
import { mapFileName } from '../utils/helpers';

@Controller('/v1/inventory')
export class InventoryController {
  constructor(
    @Inject(ProxyService) private readonly proxyService: ProxyService,
    @Inject(AuthorizationService)
    private readonly authorizationService: AuthorizationService,
  ) {}
  @Post('/body_type')
  async createBodyType(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createBodyType',
      req.body,
    );
  }

  @Put('/body_type/:id')
  async updateBodyType(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateBodyType',
      data,
    );
  }

  @Delete('/body_type/:id')
  async deleteBodyType(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteBodyType',
      { id: req.params.id },
    );
  }

  @Get('/body_type/:id')
  async readBodyType(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readBodyType',
      { id: req.params.id },
    );
  }

  @Get('/body_type')
  async getAllBodyType(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listBodyType',
      body,
    );
  }

  @Post('/car_damage_media')
  async createCarDamageMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createCarDamageMedia',
      req.body,
    );
  }

  @Put('/car_damage_media/:id')
  async updateCarDamageMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateCarDamageMedia',
      data,
    );
  }

  @Delete('/car_damage_media/:id')
  async deleteCarDamageMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteCarDamageMedia',
      { id: req.params.id },
    );
  }

  @Get('/car_damage_media/:id')
  async readCarDamageMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readCarDamageMedia',
      { id: req.params.id },
    );
  }

  @Get('/car_damage_media')
  async getAllCarDamageMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listCarDamageMedia',
      body,
    );
  }

  @Post('/car_document_conversation')
  async createCarDocumentConversation(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createCarDocumentConversation',
      req.body,
    );
  }

  @Put('/car_document_conversation/:id')
  async updateCarDocumentConversation(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateCarDocumentConversation',
      data,
    );
  }

  @Delete('/car_document_conversation/:id')
  async deleteCarDocumentConversation(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteCarDocumentConversation',
      { id: req.params.id },
    );
  }

  @Get('/car_document_conversation/:id')
  async readCarDocumentConversation(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readCarDocumentConversation',
      { id: req.params.id },
    );
  }

  @Get('/car_document_conversation')
  async getAllCarDocumentConversation(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listCarDocumentConversation',
      body,
    );
  }

  @Post('/car_document')
  async createCarDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createCarDocument',
      req.body,
    );
  }

  @Put('/car_document/:carId')
  async updateCarDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = {
      carId: req.params.carId,
      ...req.body,
    };

    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateCarDocument',
      data,
    );
  }

  @Delete('/car_document/:id')
  async deleteCarDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteCarDocument',
      { id: req.params.id },
    );
  }

  @Get('/car_document/:id')
  async readCarDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readCarDocument',
      { id: req.params.id },
    );
  }

  @Get('/car_document')
  async getAllCarDocument(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listCarDocument',
      body,
    );
  }

  @Post('/car_feature')
  async createCarFeature(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createCarFeature',
      req.body,
    );
  }

  @Put('/car_feature/:id')
  async updateCarFeature(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateCarFeature',
      data,
    );
  }

  @Delete('/car_feature/:id')
  async deleteCarFeature(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteCarFeature',
      { carId: req.params.id, ...req.body },
    );
  }

  @Get('/car_feature/:id')
  async readCarFeature(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readCarFeature',
      { id: req.params.id },
    );
  }

  @Get('/car_feature')
  async getAllCarFeature(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listCarFeature',
      body,
    );
  }

  @Post('/car_media')
  async createCarMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createCarMedia',
      req.body,
    );
  }

  @Put('/car_media/:id')
  async updateCarMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateCarMedia',
      data,
    );
  }

  @Delete('/car_media/:id')
  async deleteCarMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteCarMedia',
      { id: req.params.id },
    );
  }

  @Get('/car_media/:id')
  async readCarMedia(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readCarMedia',
      { id: req.params.id },
    );
  }

  @Get('/car_media')
  async getAllCarMedia(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;

    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listCarMedia',
      body,
    );
  }

  @Get('/car/image_html')
  async fetchImageEmbedCode(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;

    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'fetchImageEmbedCode',
      body,
    );
  }

  @Get('/car/search')
  async searchCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    Logger.log({
      query: req.query,
      originalUrl: req.originalUrl,
      ipAddress: req.ip,
    });
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'marketplaceSearchCar',
      body,
    );
  }

  @Get('/car/:id/similar')
  async similarCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listSimilarCars',
      { id: req.params.id },
    );
  }

  @Get('/car/:id/deposit_amount')
  async carDepositAmount(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'carDepositAmount',
      { id: req.params.id },
    );
  }

  @Get('/car/:id/toggle_visibility')
  async toggleMarketplaceVisibility(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'toggleMarketplaceVisibility',
      { id: req.params.id },
    );
  }

  @Post('/car/toggle_visibility')
  async toggleMarketplace(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'toggleMarketplace',
      req.body,
    );
  }

  @Get('/car/:id/toggle_financing')
  async toggleFinancing(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'toggleFinancing',
      { id: req.params.id },
    );
  }

  @Post('/car')
  async createCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createCar',
      req.body,
    );
  }

  @Put('/car/:id')
  async updateCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateCar',
      data,
    );
  }

  @Delete('/car/:id')
  async deleteCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.INVENTORY_SVC, 'deleteCar', {
      id: req.params.id,
    });
  }

  @Get('/car/:id')
  async readCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.INVENTORY_SVC, 'readCar', {
      id: req.params.id,
    });
  }

  @Get('/admin/car/:id')
  async adminReadCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'adminReadCar',
      {
        id: req.params.id,
      },
    );
  }

  @Get('/car')
  async getAllCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listCar',
      body,
    );
  }

  @Get('/car/:id/inspection/marketplace')
  async getCarInspectionMarketplace(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data: any = { id: req.params.id, ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'getCarInspectionMarketplace',
      data,
    );
  }

  @Get('/marketplace/colors')
  async listMarketplaceColors(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'marketplaceColors',
      {},
    );
  }

  @Post('/category')
  async createCategory(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createCategory',
      req.body,
    );
  }

  @Put('/category/:id')
  async updateCategory(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateCategory',
      data,
    );
  }

  @Delete('/category/:id')
  async deleteCategory(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteCategory',
      { id: req.params.id },
    );
  }

  @Get('/category/:id')
  async readCategory(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readCategory',
      { id: req.params.id },
    );
  }

  @Get('/category')
  async getAllCategory(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listCategory',
      body,
    );
  }

  @Post('/feature')
  async createFeature(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createFeature',
      req.body,
    );
  }

  @Put('/feature/:id')
  async updateFeature(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateFeature',
      data,
    );
  }

  @Delete('/feature/:id')
  async deleteFeature(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteFeature',
      { id: req.params.id },
    );
  }

  @Get('/feature/:id')
  async readFeature(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readFeature',
      { id: req.params.id },
    );
  }

  @Get('/feature')
  async getAllFeature(@Req() req: Request, @Res() res: Response): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listFeature',
      body,
    );
  }

  @Post('/make')
  @UseInterceptors(
    new FileUploadInterceptor([{ name: 'media_url', public: true }]),
  )
  async createMake(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = mapFileName(req, ['media_url']);
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createMake',
      data,
    );
  }

  @Put('/make/:id')
  @UseInterceptors(
    new FileUploadInterceptor([{ name: 'media_url', public: true }]),
  )
  async updateMake(@Req() req: Request, @Res() res: Response): Promise<any> {
    const reqBody = mapFileName(req, ['media_url']);
    const data = { id: req.params.id, ...reqBody };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateMake',
      data,
    );
  }

  @Delete('/make/:id')
  async deleteMake(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.INVENTORY_SVC, 'deleteMake', {
      id: req.params.id,
    });
  }

  @Get('/make/:id')
  async readMake(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.INVENTORY_SVC, 'readMake', {
      id: req.params.id,
    });
  }

  @Get('/make')
  async getAllMake(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listMake',
      req.query as any,
    );
  }

  @Post('/market_place_config')
  async createMarketPlaceConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createMarketPlaceConfig',
      req.body,
    );
  }

  @Put('/market_place_config/:id')
  async updateMarketPlaceConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateMarketPlaceConfig',
      data,
    );
  }

  @Delete('/market_place_config/:id')
  async deleteMarketPlaceConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteMarketPlaceConfig',
      { id: req.params.id },
    );
  }

  @Get('/market_place_config/:id')
  async readMarketPlaceConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readMarketPlaceConfig',
      { id: req.params.id },
    );
  }

  @Get('/market_place_config_country/:country')
  async readMarketPlaceConfigCountry(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readMarketPlaceConfigCountry',
      { country: req.params.country },
    );
  }

  @Get('/market_place_config')
  async getAllMarketPlaceConfig(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listMarketPlaceConfig',
      body,
    );
  }

  @Post('/saved_search')
  async createSavedSearch(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createSavedSearch',
      req.body,
    );
  }

  @Put('/saved_search/:id')
  async updateSavedSearch(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateSavedSearch',
      data,
    );
  }

  @Delete('/saved_search/:id')
  async deleteSavedSearch(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteSavedSearch',
      { id: req.params.id },
    );
  }

  @Get('/saved_search/:id')
  async readSavedSearch(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readSavedSearch',
      { id: req.params.id },
    );
  }

  @Get('/saved_search')
  async getAllSavedSearch(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;

    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listSavedSearch',
      body,
    );
  }

  @Post('/model')
  async createModel(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = req.body;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createModel',
      data,
    );
  }

  @Put('/model/:id')
  async updateModel(@Req() req: Request, @Res() res: Response): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateModel',
      data,
    );
  }

  @Delete('/model/:id')
  async deleteModel(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteModel',
      { id: req.params.id },
    );
  }

  @Get('/model/:id')
  async readModel(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(req, res, TYPES.INVENTORY_SVC, 'readModel', {
      id: req.params.id,
    });
  }

  @Get('/model')
  async getAllModel(@Req() req: Request, @Res() res: Response): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listModel',
      body,
    );
  }

  @Post('/model_feature')
  async createModelFeature(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createModelFeature',
      req.body,
    );
  }

  @Put('/model_feature/:id')
  async updateModelFeature(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const data = { id: req.params.id, ...req.body };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateModelFeature',
      data,
    );
  }

  @Delete('/model_feature/:id')
  async deleteModelFeature(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'deleteModelFeature',
      { id: req.params.id },
    );
  }

  @Get('/model_feature/:id')
  async readModelFeature(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'readModelFeature',
      {
        id: req.params.id,
      },
    );
  }

  @Get('/model_feature')
  async getAllModelFeature(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;

    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listModelFeature',
      body,
    );
  }

  @Post('/car/verify')
  async verifyCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'verifyCar',
      req.body,
    );
  }
  // autoreg car check
  @Post('/car/autoreg_check')
  async autoregCar(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'autoregCar',
      req.body,
    );
  }
  // fetch import cars
  @Get('/car/import/search')
  async importCarsSearch(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'importCarsSearch',
      body,
    );
  }

  /** Car Sourcing Endpoints Begins */
  @Post('/car-request')
  async createCarRequest(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.body;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createCarRequest',
      body,
    );
  }

  @Get('/car-request')
  async listCarRequest(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listCarRequest',
      body,
    );
  }

  @Post('/car-offer')
  async createCarRequestOffer(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.body;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createCarRequestOffer',
      body,
    );
  }

  @Get('/franchise/car-offer')
  async fetchFranchiseCarRequestFufilled(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'franchiseCarRequestFufilled',
      body,
    );
  }

  @Get('/franchise/car-request')
  async franchiseOpenCarRequest(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = req.query;
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'franchiseOpenCarRequest',
      body,
    );
  }

  @Get('/car-request/:car_request_id/car-offer')
  async listCarRequestOffers(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = { ...req.query, ...req.params };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'listCarRequestOffers',
      body,
    );
  }
  /** Car Sourcing Endpoints Ends */
  /** Inventory Activity Endpoints Starts */
  @Get('/activity')
  async getActivityLog(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'getActivityLog',
      body,
    );
  }
  /** Inventory Activity Endpoints Ends */
  /** Inspection Request Endpoints Starts */
  @Post('/inspection_request')
  async createInspectionRequest(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'createInspectionRequest',
      req.body,
    );
  }

  @Get('/inspection_request')
  async fetchAllInspectionRequests(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'fetchAllInspectionRequests',
      body,
    );
  }

  @Get('/inspection_request/:inspection_request_id')
  async getInspectionRequestById(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = { ...req.params };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'getInspectionRequestById',
      body,
    );
  }

  @Get('/franchise/inspection_request')
  async getFranchiseInspectionRequests(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'getFranchiseInspectionRequests',
      body,
    );
  }

  @Get('/assignee/inspection_request')
  async getInspectorAssignedRequests(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const body: any = { ...req.query };
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'getInspectorAssignedRequests',
      body,
    );
  }

  @Put('/inspection_request/inspector')
  async assignInspectorToRequest(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'assignInspectorToRequest',
      req.body,
    );
  }

  @Put('/inspection_request/status')
  async updateInspectionSummaryStatus(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.proxyService.send(
      req,
      res,
      TYPES.INVENTORY_SVC,
      'updateInspectionSummaryStatus',
      req.body,
    );
  }
  /** Inspection Request Endpoints Ends */
}
