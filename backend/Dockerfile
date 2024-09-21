FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN apt-get update && apt-get install -y postgresql-client

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "index.js"]