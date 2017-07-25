class GetBookByIdCondition {

    constructor(bookId) {
        this.bookId = bookId;
    }

    getSQL() {
        return 'select * from book where id = ?';
    }

    getParameters() {
        return [this.bookId];
    }
}

module.exports = GetBookByIdCondition;
