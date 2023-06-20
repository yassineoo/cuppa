// db.
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	/*
	host: 'sql8.freemysqlhosting.net',
	database: 'sql8615061',
	username : 'sql8615061',
	password : 'thama81Bp3',
	*/
	database: 'cuppa_db',
	host: 'mysql-cuppa.alwaysdata.net',
	username : 'cuppa',

	password : 'FZrP@Q3uuRZ*i7L',
	

/*
	database: 'smartbev2',

	username : 'root',

	password : 'root1234',
*/

	dialect: 'mysql'
});





export default sequelize;