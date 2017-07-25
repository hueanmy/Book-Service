const Book = require('./book');

class BookStore {

	constructor (mysqlConnection) {
		this.mysqlConnection = mysqlConnection;
	}

	search(condition) {
        return new Promise((resolve, reject) => {
            this.mysqlConnection.query(condition.getSQL(), condition.getParameters(), (error, result) => {
                if (error){
                    reject(error);
                } else {
                    resolve(result.map((rawBook) => {
                        return new Book(rawBook.name, rawBook.author);
                    }));
                }
            });
        });
	}

	create(book) {
        let query = 'insert into book set ?';

        return new Promise((resolve, reject) => {
            this.mysqlConnection.query(query, [book], (error, result) =>
                error ? reject(error) : resolve(result)
            );
        });
	};

	updateBook(infoBook, id) {
		let query = 'update book set author= ?, name= ? where id= ?';

		return new Promise((resolve, reject) => {
			this.mysqlConnection.query(query, [infoBook.author, infoBook.name, id], (error, results) => {
				if(error) {
                    reject(error);
				}

				resolve(results);
			});
		});
	};

	deleteBook(id) {
		let query = 'delete from book where id = ?';

		return new Promise((resolve, reject) => {
			this.mysqlConnection.query(query, [id], (error, results) => {
				if(error) {
                    reject(error);
				}
				resolve(results);
			});
		});
	};
}

module.exports = BookStore;
