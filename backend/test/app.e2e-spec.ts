import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as pactum from 'pactum';
import { Difficulty } from 'src/utilities/enums/enums';
import { boulderDtoFixture } from './fixture';

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    // pactum needs a server to make request
    await app.listen(3000);
  });
  afterAll(() => app.close());
  describe('Boulders', () => {
    describe('addBoulder', () => {
      it('should insert a boulder', () => {
        return pactum
          .spec()
          .post('http://localhost:3000/v1/boulders/add')
          .withBody(boulderDtoFixture)
          .expectStatus(201);
      });
      it('should throw an error without name', () => {
        return pactum
          .spec()
          .post('http://localhost:3000/v1/boulders/add')
          .withBody({
            description: 'Nice boulder',
            difficulty: Difficulty.facile,
            latitude: 45.123,
            longitude: 7.123,
            createdAt: '2025-06-18T14:30:00.000Z',
          })
          .expectStatus(400);
      });
    });
    describe('getBoulders', () => {
      it('should return all bouders', () => {
        return pactum
          .spec()
          .get('http://localhost:3000/v1/boulders/get')
          .expectStatus(200);
      });
    });
    describe('getBoulder', () => {
      it('should return one boulder', () => {
        return pactum
          .spec()
          .get('http://localhost:3000/v1/boulders/1')
          .expectStatus(200);
      });
    });
    it('should return 404 if boulder doesn t exist', () => {
      return pactum
        .spec()
        .get('http://localhost:3000/v1/boulders/999')
        .expectStatus(404);
    });
    it('should return 400 if id is invalid', () => {
      return pactum
        .spec()
        .get('http://localhost:3000/v1/boulders/invalidId')
        .expectStatus(400);
    });
  });
});
