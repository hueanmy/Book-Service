const DBConnection 		= require('./DBConnection');
const BookStore 	    = require('./BookStore');
const GetBookByIdCondition = require('./searching-conditions/get-book-by-id-condition');
const Book = require('./book');

let bookStore           = new BookStore(DBConnection);


function getBooks(req, res, next){
    bookStore.getBooks()
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
    bookStore.getBookByName(req.params.name)
        .then((book) => {
            res.json(book);
        })
        .catch((err) => {
    		res.status(500).json({message: err.message});
		});
}

function createBook(req, res){
    let book = new Book(req.body.name, req.body.author);
    bookStore.create(book)
	    .then((book) => {
            res.status(201).json(book.toJson());
	    })
	    .catch((err) => {
    		res.status(500).json({message: err.message});
		});
}

function updateBook(req, res){

    let book = new Book(req.body.name, req.body.author).setId(req.params.id);

    bookStore.update(book)
	    .then(() => {
            res.status(202).json(book.toJson());
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
