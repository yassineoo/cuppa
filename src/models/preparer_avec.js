const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'preparer_avec',
		{
			id_boisson: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'boisson',
					key: 'id_boisson',
				},
			},
			id_ingredient: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: 'outils_preparation_boisson',
					key: 'id_ingredient',
				},
			},
			quantite_preparation: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 2,
			},
		},
		{
			sequelize,
			tableName: 'preparer_avec',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [
						{ name: 'id_boisson' },
						{ name: 'id_ingredient' },
					],
				},
				{
					name: 'id_ingredient',
					using: 'BTREE',
					fields: [{ name: 'id_ingredient' }],
				},
			],
		}
	);
};
