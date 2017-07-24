const Book = require('./Book');

class BookRepository {
	
	constructor (database) {
		this.database = database;
	};

	getBooks() {
		return this.database.getBooks().then(
			(results) => {
				let books = results.map((book) => {
					return new Book(book);
				});

				return books;
			},

			(err) => {
				console.log(err);
				throw err;
			}
		);
	};

    getBookById(id) {
		return this.database.getBookById(id).then(
			(results) => {
			    if(results.length >0 ) {
                    return new Book(results[0]);
                }
			},
            (err) => {
                console.log(err);
                throw err;
            }
		);
	};

    getBookByName(name) {
        return this.database.getBookByName(name).then(
            (results) => {
                return results;
            },

            (err) => {
            	console.log(err);
            	throw err;
            }
		);
	};

	createBook(data) {
        let inforBook = new Book(data);

        return this.database.getBookByFullName(data.name).then(
			(results) => {
				if(results.length === 0) {
                    return this.database.createBook(inforBook).then(
                        (results) => {
                            return results;
                        },

                        (err) => {
                            console.log(err);
                            throw err;
                        }
                    )
				}
				throw new Error('name duplicate');
			},
			(err) => {
				throw err;
			}
		)

        // return this.database.createBook(inforBook).then(
        //     (results) => {
        //         return results;
        //     },
        //
        //     (err) => {
        //         console.log(err);
        //         throw err;
        //     }
        // )
	};

	updateBook(data, id){

		// let inforBook = new Book(data);

        return this.database.getBookById(id).then(
            (results) => {
                if(results.length > 0) {

                    return this.database.getBookByFullName(data.name).then(
                        (results) => {
                            if(results.length === 0) {
                                return this.database.updateBook(data, id).then(
                                    (results) => {
                                        return results;
                                    },

                                    (err) => {
                                        console.log(err);
                                        throw err;
                                    }
                                )
                            }
                            throw new Error('name duplicate');
                        },
                        (err) => {
                            throw err;
                        }
                    )

                    // return this.database.updateBook(data, id).then(
                    //     (results) => {
                    //         return results;
                    //     },
                    //
                    //     (err) => {
                    //         console.log(err);
                    //         throw err;
                    //     }
                    // )
                } else {
                    throw new Error('book is not available') ;
                }
            },
            (err) => {
                throw err;
            }

        );

		// return this.database.updateBook(inforBook, id).then(
		// 	(results) => {
		// 		return results;
		// 	},
        //
		// 	(err) => {
		// 		console.log(err);
		// 		throw err;
		// 	}
		// )
	};

	deleteBook(id){

		return this.database.deleteBook(id).then(
			(results) => {
				return results;
			},

			(err) => {
				console.log(err);
				throw err;
			}
		)
		
	};
}

module.exports = BookRepository;
