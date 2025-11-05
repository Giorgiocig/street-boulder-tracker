# ---------- STAGE 1: BUILD ----------
FROM node:20-alpine AS build
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Installa tutte le dipendenze (incluso Nest CLI)
RUN npm ci && npm cache clean --force

# Copia il resto del codice
COPY . .

# Genera il client Prisma
RUN npx prisma generate

# Compila l'app NestJS
RUN npm run build


# ---------- STAGE 2: RUN ----------
FROM node:20-alpine
WORKDIR /app

# Installa postgresql-client per verificare connessione DB
RUN apk add --no-cache postgresql-client

# Copia solo le dipendenze di produzione
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copia solo ciò che serve dal build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Copia lo script di avvio
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Espone la porta (Render la rileva automaticamente)
EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]