# ---- Dependencias ----
  FROM node:24-alpine AS deps
  WORKDIR /app
  
  # Habilitar corepack para pnpm
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile
  
  # ---- Build ----
  FROM node:24-alpine AS builder
  WORKDIR /app
  
  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  
  # Si tenés variables de entorno de build (ej. NEXT_PUBLIC_*), 
  # pasalas como ARG aquí:
  # ARG NEXT_PUBLIC_API_URL
  # ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
  
  RUN pnpm build
  
  # ---- Runner ----
  FROM node:24-alpine AS runner
  WORKDIR /app
  
  ENV NODE_ENV=production
  
  # Crear usuario no-root
  RUN addgroup --system --gid 1001 nodejs
  RUN adduser --system --uid 1001 nextjs
  
  # Copiar archivos necesarios del build
  COPY --from=builder /app/public ./public
  COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
  COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
  
  USER nextjs
  
  EXPOSE 3000
  ENV PORT=3000
  ENV HOSTNAME="0.0.0.0"
  
  CMD ["node", "server.js"]