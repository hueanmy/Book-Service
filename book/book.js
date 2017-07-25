class Book {
    constructor(name, author) {
        this.name = name;
        this.author = author;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    toJson() {
        return {
            id : this.id,
            name : this.name,
            author : this.author
        };
    }
}

module.exports = Book;
