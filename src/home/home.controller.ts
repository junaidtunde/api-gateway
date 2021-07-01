import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import * as auth from 'basic-auth';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import { AuthorizationService } from '../authorization/authorization.service';
import { config } from '../config';
import { FileUploadInterceptor } from '../interceptor/file-upload.interceptor';
import { PublitFileUploadInterceptor } from '../interceptor/publit-file-upload-interceptor';
import register from '../prometheus';
import { ProxyService } from '../proxy';
import { TYPES } from '../types';
import { getCountryCity } from '../utils/helpers';
import * as swaggerJSON from './swagger.json';

@Controller('/')
export class HomeController {
  private readonly userSvc: any;

  constructor(
    @Inject(AuthorizationService)
    private readonly authService: AuthorizationService,
    @Inject(ProxyService) private readonly proxyService: ProxyService,
    @Inject(TYPES.USER_SVC) private readonly userClient: ClientGrpc,
  ) {
    this.userSvc = this.userClient.getService('UserService');
  }
  @Get('/health')
  async health(@Req() req: Request, @Res() res: Response) {
    return res.json({ status: 'Ok' });
  }

  @Get('metrics')
  async metrics(@Req() req: Request, @Res() res: Response) {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (ex) {
      res.status(500).end(ex);
    }
  }

  @Post('/whatsapp')
  async whatsapp(@Req() req: Request, @Res() res: Response) {
    return res.json({ status: true });
  }

  /**
   * This route returns the country code for the requesting client.
   */
  @Get('/get-my-location')
  async getMyLocation(@Req() req: Request, @Res() res: Response) {
    const ip = req.headers['x-forwarded-for'] as string;
    const result = getCountryCity(ip);
    const country = await this.userSvc
      .getCountry({ id: result.countryCode })
      .toPromise();
    return res.json(Object.assign(country, result));
  }

  @Get('/docs/login')
  async documentationLogin(@Req() req: Request, @Res() res: Response) {
    const credentials = auth(req);

    if (!credentials || !credentials.name || !credentials.pass) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="autochek.africa"');
      res.end('Access denied');
    } else {
      try {
        const data = { email: credentials.name, password: credentials.pass };
        const response = await this.authService.login(data);
        return res
          .status(200)
          .cookie('accessToken', response.token, {
            signed: true,
            expires: new Date(Date.now() + 72 * 3600000),
          }) // cookie will expire in 3 days
          .redirect(302, '/docs');
      } catch (err) {
        if (req.headers && req.headers.authorization) {
          delete req.headers.authorization;
        }
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="autochek.africa"');
        res.end('Invalid Credentials');
      }
    }
  }

  @Get('/docs')
  async getSwaggerDoc(@Req() req: Request, @Res() res: Response) {
    if (!config.isDevelopment) {
      return res.send('Not Available');
    }

    const loader = new TwingLoaderFilesystem('./src/home/template');
    const twing = new TwingEnvironment(loader);

    const outputJSON = await this.genSwagger();

    twing.render('swagger.twig', { spec: outputJSON }).then((output) => {
      res.set('Content-Type', 'text/html');
      res.send(output);
    });
  }

  @Get('/payments')
  async getPaymentsCallbackPage(@Req() req: Request, @Res() res: Response) {
    const loader = new TwingLoaderFilesystem('./src/home/template');
    const twing = new TwingEnvironment(loader);
    switch (config.NODE_ENV) {
      case 'staging':
        twing.render('payment-callback.twig').then((output) => {
          res.set('Content-Type', 'text/html');
          res.send(output);
        });
        break;
      case 'production':
        twing.render('payment-callback-prod.twig').then((output) => {
          res.set('Content-Type', 'text/html');
          res.send(output);
        });
        break;
      default:
        break;
    }
  }

  async genSwagger() {
    const output = Object.assign({}, swaggerJSON);

    function generateSwaggerJson(path) {
      const directory = fs.readdirSync(path);

      for (const fileOrDir of directory) {
        const stat = fs.lstatSync(path + '/' + fileOrDir);
        if (stat.isDirectory()) {
          generateSwaggerJson(path + '/' + fileOrDir);
        } else if (stat.isFile()) {
          if (fileOrDir.includes('service.swagger.json')) {
            const obj = JSON.parse(
              fs.readFileSync(path + '/' + fileOrDir, 'utf8'),
            );
            output.paths = Object.assign(
              {},
              { ...output.paths },
              { ...obj.paths },
            );
            output.definitions = Object.assign(
              {},
              { ...output.definitions },
              {
                ...obj.definitions,
              },
            );
          }
        }
      }
    }

    generateSwaggerJson(join(__dirname, '../../swagger_doc'));

    return output;
  }

  @Post('/image/upload')
  @UseInterceptors(new PublitFileUploadInterceptor([{ name: 'file' }]))
  async publitFileUpload(@Req() req: Request, @Res() res: Response) {
    return res.json({
      // tslint:disable-next-line
      file: req['files'].file, // prettier-ignore
    });
  }

  @Post('/document/upload')
  @UseInterceptors(new FileUploadInterceptor([{ name: 'file' }]))
  async uploadDocument(@Req() req: Request, @Res() res: Response) {
    return res.json({
      // tslint:disable-next-line
      file: req['files'].file, // prettier-ignore
    });
  }

  @Get('/document/:name')
  async getDocument(@Req() req: Request, @Res() res: Response) {
    const name = req.params.name;
    const fileUploadInterceptor = new FileUploadInterceptor([]);
    const url = await fileUploadInterceptor.generateSignedUrl(name);
    return res.json({ signed_url: url });
  }

  @Get('/finance/docs')
  async getFinanceDocs(@Req() req: Request, @Res() res: Response) {
    if (!config.isDevelopment) {
      return res.send('Not Available');
    }
    const output = fs.readFileSync(
      join(__dirname, '../..', 'finance_docs/index.html'),
    );
    res.set('Content-Type', 'text/html');
    res.send(output);
  }

  @Get('/finance/docs/:file_name')
  async getFinanceDocsFile(@Req() req: Request, @Res() res: Response) {
    if (!config.isDevelopment) {
      return res.send('Not Available');
    }
    const output = fs.readFileSync(
      join(__dirname, '../..', `finance_docs/${req.params.file_name}`),
    );
    res.set('Content-Type', 'text/html');
    res.send(output);
  }
}
