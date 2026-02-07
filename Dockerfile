FROM node:18-alpine

WORKDIR /app

COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --omit=dev

COPY server/ ./server/
COPY client/ ./client/

WORKDIR /app/server

EXPOSE 3000

CMD ["node", "index.js"]
