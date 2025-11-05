#!/bin/sh
set -e

echo "Waiting for PostgreSQL to be ready..."

# Estrai host, porta e user da DATABASE_URL
if [ -n "$DATABASE_URL" ]; then
  DB_HOST=$(echo $DATABASE_URL | sed -E 's/^.*@([^:/]+).*/\1/')
  DB_PORT=$(echo $DATABASE_URL | sed -E 's/^.*:([0-9]+)\/.*/\1/')
  DB_USER=$(echo $DATABASE_URL | sed -E 's/^.*\/\/([^:]+):.*$/\1/')
else
  echo "DATABASE_URL not setted"
  exit 1
fi

# Attende che il DB sia raggiungibile
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  echo "PostgreSQL ($DB_HOST:$DB_PORT) not ready..."
  sleep 2
done

echo "PostgreSQL is ready"

# Esegui migrazioni
echo "Applying prisma migration..."
npx prisma migrate deploy

echo "Migrations completed"

# Avvia l'app
echo "NestJS is starting up..."
exec node dist/main.js