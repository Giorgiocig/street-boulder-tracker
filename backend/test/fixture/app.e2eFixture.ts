import { BoulderDto } from 'src/boulder/dto';
import { EventDto } from 'src/event/dto';
import { Difficulty } from 'src/utilities/enums/enums';

export * from './app.e2eFixture';

export const boulderDtoFixture: BoulderDto = {
  name: 'Test Boulder',
  description: 'Nice boulder',
  difficulty: Difficulty.facile,
  latitude: 45.123,
  longitude: 7.123,
  createdAt: '2025-06-18T14:30:00.000Z',
  eventId: 1,
};

export const eventBodyRequestFixture: EventDto = {
  name: 'evento',
  description: 'description',
  date: '2025-06-18T14:30:00.000Z',
  city: 'Roma',
  latitude: 1,
  longitude: 2,
  createdAt: '2025-06-18T14:30:00.000Z',
};
