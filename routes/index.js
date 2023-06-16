const router = require('express').Router();

const routerUser = require('./users');
const routerCard = require('./cards');

router.use('/users', routerUser);
router.use('/cards', routerCard);

module.exports = router;
