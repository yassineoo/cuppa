const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {

	return sequelize.define('parametre', {
		localisation_dynamique_distributeur: {
			type: DataTypes.STRING(50),
			allowNull: false,
			primaryKey: true
		}
	}, {
		sequelize,
		tableName: 'parametre',
		timestamps: false,
		indexes: [
			{
				name: 'PRIMARY',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'localisation_dynamique_distributeur' },
				]
			},
		]
	});

};
