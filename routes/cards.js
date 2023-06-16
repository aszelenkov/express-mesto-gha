const routerCard = require('express').Router();
const cardsController = require('../controllers/cards');

routerCard.get('/', cardsController.getCards);
routerCard.post('/', cardsController.createCard);
routerCard.delete('/:cardId', cardsController.deleteCard);
routerCard.put('/:cardId/likes', cardsController.likeCard);
routerCard.delete('/:cardId/likes', cardsController.dislikeCard);

module.exports = routerCard;
