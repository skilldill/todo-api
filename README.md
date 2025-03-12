### Локальный запуск API

Запускать нужно в Docker

- Собираем контейнер
```sh
docker-compose build
```

- Запускаем API
```sh
docker-compose up -d
```

API запустится на ```http://localhost:4000```.

```http://localhost:4000/todos``` вернет список задач
