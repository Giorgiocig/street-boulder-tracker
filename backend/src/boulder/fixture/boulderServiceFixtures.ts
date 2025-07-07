import { Difficulty } from 'src/utilities/enums/enums';
import { BoulderDto } from '../dto';

export const createBaseDto = (userId?: number): BoulderDto => {
  const baseDto: BoulderDto = {
    name: 'Test Boulder',
    description: 'Nice boulder',
    difficulty: Difficulty.facile,
    latitude: 45.123,
    longitude: 7.123,
    createdAt: '2025-06-18T14:30:00.000Z',
    eventId: 1,
  };
  return !userId ? baseDto : { ...baseDto, userId: userId };
};
