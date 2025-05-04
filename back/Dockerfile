# Используем лёгкий образ Node.js
FROM node:22-alpine

# Рабочая директория
WORKDIR /app

# Копируем зависимости
COPY package.json ./
COPY prisma ./prisma/

# Устанавливаем зависимости (включая Prisma)
RUN npm install

# Копируем остальные файлы
COPY . .

# Генерируем Prisma Client
RUN npx prisma generate

# Создаём файл SQLite (если его нет) и даём права на запись
# RUN touch /app/prisma/dev.db && chmod +w /app/prisma/dev.db

# Применяем миграции (если они есть)
RUN npx prisma migrate dev --name init

# Запускаем приложение
CMD ["npm", "run", "start:dev"]