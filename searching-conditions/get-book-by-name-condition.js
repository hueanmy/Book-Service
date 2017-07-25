class GetBookByNameCondition {

    constructor(bookName) {
        this.bookName = bookName;
    }

    getSQL() {
        return 'select * from book where name like ?';
    }

    getParameters() {
        return [`%${this.bookName}%`];
    }
}

module.exports = GetBookByNameCondition;