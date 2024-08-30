# Используем легковесный образ nginx
FROM nginx:alpine

# Копируем статические файлы из папки dist в папку nginx
COPY ./dist /usr/share/nginx/html

# Экспонируем порт 80 для веб-сервера
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
