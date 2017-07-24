const BookRepository 	= require('./BookRepository');
const DBConnection 		= require('./DBConnection');
const BookStore 	    = require('./BookStore');

let bookstore           = new BookStore(DBConnection);
let bookRepository      = new BookRepository(bookstore);

function getBooks(req, res, next){
    bookRepository.getBooks()
    	.then((books) => {
    		if(books !== null) {
                res.json(books);
			}
			else {
                res.status(404).send('Not found');
            }
    	})
    	.catch(next);
}

function getBookById(req, res, next){
    bookRepository.getBookById(req.params.id)
	    .then((book) => {
    		if (book !== null) {
    			res.json(book);
			}
			else {
                res.status(404).send('Not found');
            }
	    })
	    .catch(next);
}

function getBookByName(req, res, next){
    bookRepository.getBookByName(req.params.name)
        .then((book) => {

            if (book !== null) {
                res.json(book);
            }
            else {
                res.status(404).send('Not found');
            }
        })
        .catch((err) => {
    		res.status(500).json({message: err.message});
		});
}

function createBook(req, res, next){
    bookRepository.createBook(req.body)
	    .then((book) => {
            res.status(201).json(Object.assign({id: book.insertId}, req.body));
	    })
	    .catch((err) => {
    		res.status(500).json({message: err.message});
		});
}

function updateBook(req, res){
    bookRepository.updateBook(req.body, req.params.id)
	    .then(() => {
            res.status(202).json(Object.assign({id: req.params.id}, req.body));
	    })
        .catch((err) => {
            res.status(500).json({message: err.message});
        });
}

function deleteBook(req, res, next){
    bookRepository.deleteBook(req.params.id)
	    .then(() => {
            res.json(Object.assign({id: req.params.id}));
	    })
	    .catch((err) =>{
            res.status(500).json({message: err.message});
		});
}

exports.getBooks      = getBooks;
exports.getBookById   = getBookById;
exports.getBookByName = getBookByName;
exports.createBook    = createBook;
exports.updateBook    = updateBook;
exports.deleteBook    = deleteBook;
