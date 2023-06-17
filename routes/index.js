const router = require('express').Router();

const routerUser = require('./users');
const routerCard = require('./cards');

const {
  ERROR_NOT_FOUND,
} = require('../utils/constants');

router.use('/users', routerUser);
router.use('/cards', routerCard);
router.use('/*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
