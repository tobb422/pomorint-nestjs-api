export default {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": 5432,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "entities": ["src/**/**.entity{.ts,.js}"],
  "migrations": ["src/db/migrations/**/**.ts"],
  "cli": {
    "migrationsDir": "src/db/migrations"
  },
  "synchronize": false
}
