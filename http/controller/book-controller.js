const DBConnection 		= require('../../database/db-connection');
const BookStore 	    = require('../../book/book-store');
const GetBookByIdCondition = require('../../book/searching-conditions/get-book-by-id-condition');
const Book = require('../../book/book');
const GetBookByNameCondition = require('../../book/searching-conditions/get-book-by-name-condition');

let bookStore           = new BookStore(DBConnection);

function getBooks(request, response, next) {
    bookStore.search(request.condition)
    	.then((books) => {
            books.length ? response.json(books.map(book => book.toJson())) : response.status(404).send('Not found');
    	})
    	.catch(next);
}

function getBookById(request, response, next){
    bookStore.search(new GetBookByIdCondition(request.params.id))
	    .then((books) => {
    		if (books.length) {
    			response.json(books[0].toJson());
			}
			else {
                response.status(404).send('Not found');
            }
	    })
	    .catch(next);
}

function getBookByName(request, response){
    bookStore.search(new GetBookByNameCondition(request.params.name))
        .then((books) => {
            response.json(books.map( book => book.toJson() ));
        })
        .catch((err) => {
    		response.status(500).json({message: err.message});
		});
}

function createBook(request, response){
    let book = new Book(request.body.name, request.body.author);
    bookStore.create(book)
	    .then((book) => {
            response.status(201).json(book.toJson());
	    })
	    .catch((err) => {
    		response.status(500).json({message: err.message});
		});
}

function updateBook(request, response){

    let book = new Book(request.body.name, request.body.author).setId(request.params.id);

    bookStore.update(book)
	    .then(() => {
            response.status(202).json(book.toJson());
	    })
        .catch((err) => {
            response.status(500).json({message: err.message});
        });
}

function deleteBook(request, response){
    bookStore.deleteBook(request.params.id)
	    .then(() => {
            response.json({message: `Book has id = ${request.params.id} is deleted`});
	    })
	    .catch((err) =>{
            response.status(500).json({message: err.message});
		});
}

exports.getBooks      = getBooks;
exports.getBookById   = getBookById;
exports.getBookByName = getBookByName;
exports.createBook    = createBook;
exports.updateBook    = updateBook;
exports.deleteBook    = deleteBook;
