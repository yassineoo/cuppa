// db.ts
import  { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
	dialect: 'mysql',
	database: 'smartbev2',
	username: 'root',
	password: '',
});

console.log(sequelize.define);

export default sequelize;
