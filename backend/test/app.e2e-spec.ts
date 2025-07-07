import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as pactum from 'pactum';
import { Difficulty } from 'src/utilities/enums/enums';
import { boulderDtoFixture, eventBodyRequestFixture } from './fixture';
import { PrismaClient } from '@prisma/client';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3000);

    prisma = new PrismaClient();

    // clean up event boulder (child of event)
    await prisma.boulder.deleteMany();
    // clean up boulder
    await prisma.event.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });
  describe('Boulders', () => {
    describe('addBoulder', () => {
      it('should insert a boulder', async () => {
        const eventId = await pactum
          .spec()
          .post('http://localhost:3000/v1/events/add')
          .withBody(eventBodyRequestFixture)
          .expectStatus(201)
          // save generated id
          .returns('id');

        await pactum
          .spec()
          .post('http://localhost:3000/v1/boulders/add')
          .withBody({
            ...boulderDtoFixture,
            // assign id dinamically
            eventId,
          })
          .expectStatus(201)
          .stores('boulderId', 'id');
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
            eventId: 1,
          })
          .expectStatus(400);
      });
    });
    describe('getBoulders', () => {
      it('should return all bouders', () => {
        return pactum
          .spec()
          .get('http://localhost:3000/v1/boulders/get')
          .expectStatus(200)
          .expectJsonLike([
            {
              id: '$S{boulderId}',
              name: boulderDtoFixture.name,
            },
          ]);
      });
    });
    describe('getBoulder', () => {
      it('should return one boulder', () => {
        return pactum
          .spec()
          .get('http://localhost:3000/v1/boulders/{id}')
          .withPathParams('id', '$S{boulderId}')
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
  describe('updateBoulder', () => {
    it('should update a boulder', () => {
      return pactum
        .spec()
        .patch('http://localhost:3000/v1/boulders/{id}')
        .withPathParams('id', '$S{boulderId}')
        .withBody({ name: 'Updated Boulder' })
        .expectStatus(200)
        .expectBodyContains('Updated Boulder');
    });
    it('should return 400 if id is invalid', () => {
      return pactum
        .spec()
        .patch('http://localhost:3000/v1/boulders/invalidId')
        .expectStatus(400);
    });
    it('should return 404 if boulder doesn t exist', () => {
      return pactum
        .spec()
        .patch('http://localhost:3000/v1/boulders/999')
        .expectStatus(404);
    });
  });
  describe('deleteBoulder', () => {
    it('should delete a boulder', () => {
      return pactum
        .spec()
        .delete('http://localhost:3000/v1/boulders/{id}')
        .withPathParams('id', '$S{boulderId}')
        .expectStatus(200)
        .expectJsonLike({ id: '$S{boulderId}', name: 'Updated Boulder' });
    });
    it('should return 400 if id is invalid', () => {
      return pactum
        .spec()
        .delete('http://localhost:3000/v1/boulders/invalidId')
        .expectStatus(400);
    });
    it('should return 404 if boulder doesn t exist', () => {
      return pactum
        .spec()
        .patch('http://localhost:3000/v1/boulders/999')
        .expectStatus(404);
    });
  });
});
