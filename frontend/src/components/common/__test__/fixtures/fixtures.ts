export const boulderFixture = {
  id: 123,
  latitude: 41.9,
  longitude: 12.5,
  name: "Boulder 1",
  description: "Descrizione 1",
  difficulty: "facile" as const,
  createdAt: "2023-01-01T00:00:00.000Z",
  eventId: 1,
};

export const eventFixture = {
  id: 1,
  name: "Evento 1",
  description: "event test",
  date: "2023-01-01T00:00:00.000Z",
  city: "roma",
  latitude: 1,
  longitude: 2,
  createdAt: "2023-01-01T00:00:00.000Z",
};
