const express 		 = require('express');
const bookController = require('./BookController');

const validateIdNumber    = require('./validate/number');
const validateInputName   = require('./validate/name');
const validateInputAuthor = require('./validate/author');

let router = express.Router();

router.get('/', bookController.getBooks);

router.get('/name/:name', bookController.getBookByName);

router.get('/:id', validateIdNumber, bookController.getBookById);

router.get('/name/:name', bookController.getBookByName);

router.post('/', validateInputName, validateInputAuthor, bookController.createBook);

router.put('/:id', validateIdNumber, validateInputName, validateInputAuthor, validateIdNumber, bookController.updateBook);

router.delete('/:id', validateIdNumber, bookController.deleteBook);


module.exports = router;
