import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserServiceMock } from './user.service.mock';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('UserController Tests', () => {
  let app: INestApplication;
  let httpServer;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useClass(UserServiceMock)
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
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        const body = response.body;
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('name');
      });
  });

  test('should create a single user', () => {
    return httpServer
      .post('/users')
      .send({ name: 'test-user' })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        const body = response.body;
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('name');
      });
  });
});
