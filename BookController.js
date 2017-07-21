const BookRepository 	= require('./BookRepository');
const DBConnection 		= require('./DBConnection');
const BookStore 	= require('./BookStore');

let bookstore = new BookStore(DBConnection);
let bookRepository = new BookRepository(bookstore);

function getBooks(req, res, next){
    bookRepository.getBooks()
    	.then((books) => {
        	res.json(books);
    	})
    	.catch(next);
};

function getBookById(req, res, next){
    bookRepository.getBookById(req.params.id)
	    .then((book) => {
	        res.json(book);
	    })
	    .catch(next);
};

function getBookByName(req, res, next){
    bookRepository.getBookByName(req.params.name)
        .then((book) => {
            res.json(book);
        })
        .catch(next);
};

function createBook(req, res, next){
    bookRepository.createBook(req.body)
	    .then((result) => {
	        res.end('InsertId ' + result.insertId);
	    })
	    .catch(next);
};

function updateBook(req, res, next){
    bookRepository.updateBook(req.body, req.params.id)
	    .then((result) => {
            res.json(Object.assign({id: req.params.id}, req.body));
	    })
	    .catch(next);
};

function deleteBook(req, res, next){
    bookRepository.deleteBook(req.params.id)
	    .then((result) => {
	        res.end('Deleted ' + result.affectedRows + ' rows');
	    })
	    .catch(next);
};

exports.getBooks      = getBooks;
exports.getBookById   = getBookById;
exports.getBookByName = getBookByName;
exports.createBook    = createBook;
exports.updateBook    = updateBook;
exports.deleteBook    = deleteBook;
