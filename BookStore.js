class BookStore {

	constructor (mysqlConnection) {
		this.mysqlConnection = mysqlConnection;
	}

	getBooks() {
		let query = 'select * from book';

		return new Promise((resolve, reject) => {
			this.mysqlConnection.query(query, (err, result) => {
				if (err){
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	};

    getBookById(id) {
		let query = 'select * from book where id = ? ';

		return new Promise((resolve, reject) => {
            this.mysqlConnection.query(query, [id], (err, result) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
		});
	};

    getBookByName(name) {
        let query = " select * from book where name like '%" + name + "%' ";

        return new Promise((resolve, reject) => {
            this.mysqlConnection.query(query, (err, result) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    };


	createBook(data) {
        let query = 'insert into book set ? ';

        return new Promise((resolve, reject) => {
            this.mysqlConnection.query(query, [data], (err, result) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
	};

	updateBook(infoBook, id) {
		let query = 'update book set author= ?, name= ? where id= ?';

		return new Promise((resolve, reject) => {
			this.mysqlConnection.query(query, [infoBook.author, infoBook.name, id], (err, results) => {
				if(err)
					reject(err);
				resolve(results);
			});
		});
	};

	deleteBook(id) {
		let query = 'delete from book where id = ?';

		return new Promise((resolve, reject) => {
			this.mysqlConnection.query(query, [id], (err, results) => {
				if(err)
					reject(err);
				resolve(results);
			});
		});
	};

};

module.exports = BookStore;
