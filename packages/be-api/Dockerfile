# Используем Node.js LTS
FROM node:22-alpine

# Устанавливаем Yarn 4.x глобально
RUN corepack enable && corepack prepare yarn@4.6.0 --activate

# Рабочая директория
WORKDIR /app

# Копируем все файлы монорепозитория
COPY ../../ .

# Устанавливаем зависимости (включая PnP)
RUN yarn install

# Переходим в директорию be-api
WORKDIR /app/packages/be-api

# Собираем проект
RUN yarn build

# Порт, который использует Express
EXPOSE 8000

# Команда запуска
CMD ["yarn", "start"]