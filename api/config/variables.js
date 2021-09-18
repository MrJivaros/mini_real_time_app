import dotenv from 'dotenv'
dotenv.config()

const DB_URL = `${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_DBNAME}`;
const PORT = process.env.PORT || 8081;

export {
  DB_URL,
  PORT
}