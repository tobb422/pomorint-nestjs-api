const PostgressConnectionStringParser = require('pg-connection-string')

const databaseUrl = process.env.DATABASE_URL
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl)

module.exports = {
  "type": "postgres",
  "host": connectionOptions.host,
  "port": 5432,
  "username": connectionOptions.user,
  "password": connectionOptions.password,
  "database": process.env.DATABASE_NAME,
  "entities": ["src/**/**.entity{.ts,.js}"],
  "migrations": ["db/migrations/**/**.ts"],
  "cli": {
    "migrationsDir": "db/migrations"
  },
  "synchronize": false,
  "ssl": process.env.NODE_ENV === 'production'
}
