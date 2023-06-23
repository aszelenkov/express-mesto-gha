const routerCards = require('express').Router();
const cardsController = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/validate');

routerCards.get('/', cardsController.getCards);
routerCards.post('/', validateCreateCard, cardsController.createCard);
routerCards.delete('/:cardId', validateCardId, cardsController.deleteCard);
routerCards.put('/:cardId/likes', validateCardId, cardsController.likeCard);
routerCards.delete('/:cardId/likes', validateCardId, cardsController.dislikeCard);

module.exports = routerCards;
