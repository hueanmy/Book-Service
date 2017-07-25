const DBConnection 		= require('../DBConnection');
const BookStore 	    = require('../BookStore');

let bookStore           = new BookStore(DBConnection);

module.exports = function(req, res, next) {

};