import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryServiceMock } from './inventory.service.mock';

describe('UserController Tests', () => {
  let app: INestApplication;
  let httpServer;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [InventoryService],
    })
      .overrideProvider(InventoryService)
      .useClass(InventoryServiceMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    httpServer = request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  test('should return list of users', () => {
    return httpServer
      .get('/cars')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const body = response.body;
        expect(body).toHaveProperty('status', true);
        expect(body).toHaveProperty('message', 'operation successful');
        expect(Array.isArray(body.data)).toBeTruthy();
        expect(body.data[0]).toHaveProperty('id');
        expect(body.data[0]).toHaveProperty('sourceCarID');
        expect(body.data[0]).toHaveProperty('vin');
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
