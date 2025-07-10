import { Difficulty } from 'src/utilities/enums/enums';

export const eventFixture = {
  name: 'Test Event',
  description: 'description',
  date: '2025-06-18T14:30:00.000Z',
  city: 'Milan',
  latitude: 45.123,
  longitude: 7.123,
  createdAt: '2025-06-18T14:30:00.000Z',
};

export const eventWithBouldersFixture = {
  id: 1,
  name: 'Test Event',
  description: 'description',
  date: '2025-06-18T14:30:00.000Z',
  city: 'Milan',
  latitude: 45.123,
  longitude: 7.123,
  createdAt: '2025-06-18T14:30:00.000Z',
  boulders: [
    {
      name: 'Test Boulder1',
      description: 'Nice boulder',
      difficulty: Difficulty.facile,
      latitude: 45.123,
      longitude: 7.123,
      createdAt: '2025-06-18T14:30:00.000Z',
      eventId: 1,
    },
    {
      name: 'Test Boulder2',
      description: 'Nice boulder',
      difficulty: Difficulty.facile,
      latitude: 45.123,
      longitude: 7.123,
      createdAt: '2025-06-18T14:30:00.000Z',
      eventId: 1,
    },
  ],
};
