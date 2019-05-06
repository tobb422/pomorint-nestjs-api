import * as PostgressConnectionStringParser from "pg-connection-string"

const databaseUrl: string = process.env.DATABASE_URL
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl)

export default {
  "type": "postgres",
  "host": connectionOptions.host,
  "port": 5432,
  "username": connectionOptions.user,
  "password": connectionOptions.password,
  "database": process.env.DATABASE_NAME,
  "entities": ["src/**/**.entity{.ts,.js}"],
  "migrations": ["src/db/migrations/**/**.ts"],
  "cli": {
    "migrationsDir": "src/db/migrations"
  },
  "synchronize": false
}
