FROM node:22.14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod:migrate"]