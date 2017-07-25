const DBConnection 		= require('./DBConnection');
const BookStore 	    = require('./BookStore');

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
    bookStore.getBookById(req.params.id)
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
    bookStore.getBookByName(req.params.name)
        .then((book) => {
            res.json(book);
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
