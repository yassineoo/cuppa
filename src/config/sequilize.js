// db.ts
const   { Sequelize }  = require( 'sequelize');

const sequelize = new Sequelize({
	dialect: 'mysql',
	database: 'smartbev',
	username: 'root',
	password: 'root1234',
});



module.exports =  sequelize;