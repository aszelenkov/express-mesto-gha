require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mestodb';

module.exports = {
  PORT,
  MONGO_URL,
};
