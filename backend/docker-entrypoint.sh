#!/bin/sh
set -e

echo "🔍 Checking DATABASE_URL..."

# Vérifie que DATABASE_URL existe
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not set"
  exit 1
fi

echo "DATABASE_URL is set"

# Extrait host, port et user depuis DATABASE_URL
DB_USER=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://([^:]+):.*|\1|')
DB_HOST=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://[^@]+@([^:/]+).*|\1|')
DB_PORT=$(echo "$DATABASE_URL" | sed -E 's|^postgresql://[^@]+@[^:]+:([0-9]+)/.*|\1|')

# Si le port n'est pas trouvé, utilise le port par défaut
if [ -z "$DB_PORT" ]; then
  DB_PORT=5432
fi

echo "📡 DB_USER: $DB_USER"
echo "📡 DB_HOST: $DB_HOST"
echo "📡 DB_PORT: $DB_PORT"

# Attendre que PostgreSQL soit prêt
echo "⏳ Waiting for PostgreSQL to be ready..."
MAX_TRIES=30
COUNT=0

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" 2>/dev/null || [ $COUNT -eq $MAX_TRIES ]; do
  COUNT=$((COUNT + 1))
  echo "PostgreSQL ($DB_HOST:$DB_PORT) not ready... (attempt $COUNT/$MAX_TRIES)"
  sleep 2
done

if [ $COUNT -eq $MAX_TRIES ]; then
  echo "❌ Could not connect to PostgreSQL after $MAX_TRIES attempts"
  echo "Please check:"
  echo "  - DATABASE_URL is correct"
  echo "  - Database instance is running"
  echo "  - Network connectivity"
  exit 1
fi

echo "✅ PostgreSQL is ready!"

# Exécuter les migrations Prisma
echo "🔄 Running Prisma migrations..."
npx prisma migrate deploy

echo "✅ Migrations completed"

# Démarrer l'application
echo "🚀 Starting NestJS application..."
exec node dist/main.js