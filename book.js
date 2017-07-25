class Book {
    constructor(name, author) {
        this.name = name;
        this.author = author;
    }

    toJson() {
        return {
            name : this.name,
            author : this.author
        };
    }
}

module.exports = Book;
