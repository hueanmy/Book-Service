const DBConnection 		= require('./DBConnection');
const BookStore 	    = require('./BookStore');
const GetBookByIdCondition = require('./searching-conditions/get-book-by-id-condition');
const GetBookByNameCondition = require('./searching-conditions/get-book-by-name-condition');
const GetBookCondition = require('./searching-conditions/get-book-condition');

let bookStore           = new BookStore(DBConnection);

function getBooks(req, res, next){
    bookStore.search(new GetBookCondition())
    	.then((books) => {
    		if(books.length) {
                res.json(books);
			}
			else {
                res.status(404).send('Not found');
            }
    	})
    	.catch(next);
}

function getBookById(req, res, next){
    bookStore.search(new GetBookByIdCondition(req.params.id))
	    .then((books) => {
    		if (books.length) {
    			res.json(books[0].toJson());
			}
			else {
                res.status(404).send('Not found');
            }
	    })
	    .catch(next);
}

function getBookByName(req, res, next){
    bookStore.search(new GetBookByNameCondition(req.params.name))
        .then((books) => {
            res.json(books.map( book => book.toJson() ));
        })
        .catch((err) => {
    		res.status(500).json({message: err.message});
		});
}

function createBook(req, res, next){
    bookStore.createBook(req.body)
	    .then((book) => {
            res.status(201).json(Object.assign({id: book.insertId}, req.body));
	    })
	    .catch((err) => {
    		res.status(500).json({message: err.message});
		});
}

function updateBook(req, res){
    bookStore.updateBook(req.body, req.params.id)
	    .then(() => {
            res.status(202).json(Object.assign({id: req.params.id}, req.body));
	    })
        .catch((err) => {
            res.status(500).json({message: err.message});
        });
}

function deleteBook(req, res, next){
    bookStore.deleteBook(req.params.id)
	    .then(() => {
            res.send('Delete successful');
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
