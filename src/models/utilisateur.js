const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {

	return sequelize.define(
		'utilisateur',
		{
			id_utilisateur: {
				type: DataTypes.STRING(50),
				allowNull: false,
				primaryKey: true,
			},
			username_utilisateur: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			password_utilisateur: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			mail_utilisateur: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			id_role: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'role',
					key: 'id_role',
				},
			},
		},
		{
			sequelize,
			tableName: 'utilisateur',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id_utilisateur' }],
				},
				{
					name: 'id_role',
					using: 'BTREE',
					fields: [{ name: 'id_role' }],
				},
			],
		}
	);

};
