const DBConnection = require('../../database/db-connection');
const BookStore    = require('../../book/book-store');

let bookStore      = new BookStore(DBConnection);

module.exports = function(request, response, next) {
	bookStore.get(request.params.id).then( book => {
		if(book) {
			request.book = book;
			return next();
		}
		response.status(404).json({
			message : `Book with id: ${request.params.id} is not existed`
		});
	});
}