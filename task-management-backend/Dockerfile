# Stage 1
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM node:22-alpine 

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/build ./build

COPY --from=builder /app/src ./src

EXPOSE 3000

CMD ["node", "build/index.js"]