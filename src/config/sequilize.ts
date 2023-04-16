// db.ts
import  { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
	dialect: 'mysql',
	database: 'smartbev',
	username: 'root',
	password: '',
});



export default sequelize;