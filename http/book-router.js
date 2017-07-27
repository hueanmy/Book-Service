const express 		 = require('express');
const bookController = require('./controller/book-controller');

const conditionMiddleware            = require('./middleware/condition-middleware');
const bookValidatorMiddleware        = require('./middleware/book-validator-middleware');
const bookExistedValidatorMiddleware = require('./middleware/book-existed-validator-middleware');


let router = express.Router();

router.get('/', conditionMiddleware, bookController.getBooks);

router.get('/:id', bookExistedValidatorMiddleware, bookController.getBookById);

router.post('/', bookValidatorMiddleware, bookController.createBook);

router.put('/:id', bookExistedValidatorMiddleware, bookValidatorMiddleware, bookController.updateBook);

router.delete('/:id', bookExistedValidatorMiddleware, bookController.deleteBook);


module.exports = router;
