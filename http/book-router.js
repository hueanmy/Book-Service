const express 		 = require('express');
const bookController = require('./controller/book-controller');

const validateIdNumber    = require('./middleware/number');
const conditionMiddleware = require('./middleware/condition-middleware');
const validateInputName   = require('./middleware/name');
const validateInputAuthor = require('./middleware/author');

let router = express.Router();

router.get('/', conditionMiddleware, bookController.getBooks);

router.get('/:id', validateIdNumber, bookController.getBookById);

router.post('/', validateInputName, validateInputAuthor, bookController.createBook);

router.put('/:id', validateIdNumber, validateInputName, validateInputAuthor, validateIdNumber, bookController.updateBook);

router.delete('/:id', validateIdNumber, bookController.deleteBook);


module.exports = router;
