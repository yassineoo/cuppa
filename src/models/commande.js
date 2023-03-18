const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {

	return sequelize.define('commande', {
		id_cmd: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		date_cmd: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		heure_cmd: {
			type: DataTypes.TIME,
			allowNull: false
		},
		prix_cmd: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		quantite_sucre: {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		etat_cmd: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		id_boisson: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'boisson',
				key: 'id_boisson'
			}
		}
	}, {
		sequelize,
		tableName: 'commande',
		timestamps: false,
		indexes: [
			{
				name: 'PRIMARY',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'id_cmd' },
				]
			},
			{
				name: 'id_boisson',
				using: 'BTREE',
				fields: [
					{ name: 'id_boisson' },
				]
			},
		]
	});

};
