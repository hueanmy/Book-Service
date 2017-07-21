const express 		 = require('express');
const bookController = require('./BookController');

let router = express.Router();

router.get('/', bookController.getBooks);

router.get('/:id', bookController.filterId);

router.get('/name/:name', bookController.filterName);

router.post('/', bookController.createBook);

router.put('/', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;
