exports.up = function(knex, Promise) {
	return knex.schema.createTable('book', (table) => {
		table.increments('id');
		table.string('name').notNullable();
		table.string('author').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('book');

};
