const BookRepository 	= require('./BookRepository');
const DBConnection 		= require('./DBConnection');
const DataFromMysql 	= require('./BookStore');

let dataFromMysql = new DataFromMysql(DBConnection);
let bookRepository = new BookRepository(dataFromMysql);

function getBooks(req, res, next){
    bookRepository.getBooks()
    	.then((books) => {
        	res.json(books);
    	})
    	.catch(next);
};

function filterBook(req, res, next){
    bookRepository.filterBook(req.params.id)
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
    bookRepository.updateBook(req.body)
	    .then((result) => {
	        res.end('Changed ' + result.changedRows + ' rows');
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

exports.getBooks = getBooks;
exports.filterBook = filterBook;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
