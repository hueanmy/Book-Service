class BookStore {

	constructor (mysqlConnection) {
		this.mysqlConnection = mysqlConnection;
	}

	getBooks() {
		let query = 'select * from book';

		return new Promise((resolve, reject) => {
			this.mysqlConnection.query(query, (error, result) => {
				if (error){
					reject(error);
				} else {
					resolve(result);
				}
			});
		});
	};

    getBookById(id) {
		let query = 'select * from book where id = ?';

		return new Promise((resolve, reject) => {
            this.mysqlConnection.query(query, [id], (error, result) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
		});
	};

    getBookByName(name) {
        let query = " select * from book where name like '%" + name + "%' ";

        return new Promise((resolve, reject) => {
            this.mysqlConnection.query(query, (error, result) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
        });
    };

	getBookByFullName(name) {

		let query = 'select * from book where name = ? limit 1';

		return new Promise((resolve, reject) => {
			this.mysqlConnection.query(query, [name], (error, results) => {
				if(error) {
					reject(error);
				}
				resolve(results[0]);
			});
		});
	}

	createBook(data) {
        let query = 'insert into book set ?';

        return new Promise((resolve, reject) => {
            this.mysqlConnection.query(query, [data], (error, result) =>
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
