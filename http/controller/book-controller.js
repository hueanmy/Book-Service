const DBConnection 		     = require('../../database/db-connection');
const BookStore 	         = require('../../book/book-store');
// const GetBookByIdCondition   = require('../../book/searching-conditions/get-book-by-id-condition');
// const Book                   = require('../../book/book');
// const GetBookByNameCondition = require('../../book/searching-conditions/get-book-by-name-condition');

let bookStore                = new BookStore(DBConnection);

function getBooks(request, response, next) {
    bookStore.search(request.condition)
    	.then((books) => {
            books.length ? response.json(books.map(book => book.toJson())) : response.status(404).send('Not found');
    	})
    	.catch(next);
}

function getBookById(request, response, next){
    response.json(request.book.toJson());
}

function createBook(request, response){
    bookStore.create(request.book)
	    .then((book) => {
            response.status(201).json(book.toJson());
	    })
	    .catch((err) => {
    		response.status(500).json({message: err.message});
		});
}

function updateBook(request, response) {

    bookStore.update(request.book)
	    .then(() => {
            response.status(202).json(request.book.toJson());
	    })
        .catch((err) => {
            response.status(500).json({message: err.message});
        });
}

function deleteBook(request, response){
    bookStore.deleteBook(request.book.id)
	    .then(() => {
            response.json(request.book.toJson());
	    })
	    .catch((err) =>{
            response.status(500).json({message: err.message});
		});
}

exports.getBooks      = getBooks;
exports.getBookById   = getBookById;
exports.createBook    = createBook;
exports.updateBook    = updateBook;
exports.deleteBook    = deleteBook;
