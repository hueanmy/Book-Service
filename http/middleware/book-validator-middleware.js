const Book = require('./../../book/book');

module.exports = function(request, response, next) {
    if(request.body.author === '' || request.body.author === undefined){
        return response.status(422).json({
            message : 'Indispensable author'
        });
    }

    if(request.body.name === '' || request.body.name === undefined){
        return response.status(422).json({
            message : 'Indispensable name'
        });
    }

    if(!request.book) {
    	request.book = new Book(request.body.name, request.body.author);
    }

    request.book.name = request.body.name;
    request.book.author = request.body.author;

    next();
};