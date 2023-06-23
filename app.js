const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const handleError = require('./middlewares/handleError');

const app = express();

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errors());
app.use(handleError);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
