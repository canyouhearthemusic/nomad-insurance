Запуск
=================

```
git clone https://github.com/canyouhearthemusic/nomad-insurance.git 
```

```
cd nomad-insurance
cd backend
cp .env.example .env &&
cd ..
```

```
docker compose up -d
docker compose run --rm composer install
docker compose run --rm artisan key:generate
docker compose run --rm artisan migrate --seed
docker compose run --rm frontend install
docker compose run --rm frontend run build
```

## Приложение готово к использованию.
