const GetBookCondition       = require('../../book/searching-conditions/get-book-condition');
const GetBookByNameCondition = require('../../book/searching-conditions/get-book-by-name-condition');

module.exports = function (request, response, next) {
    let condition = new GetBookCondition();
    if (request.query.name) {
        condition = new GetBookByNameCondition(request.query.name);
    }
    request.condition = condition;
    next();
};
