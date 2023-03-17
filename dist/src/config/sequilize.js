"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// db.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    database: 'smartbev',
    username: 'root',
    password: 'root1234',
});
exports.default = sequelize;
//# sourceMappingURL=sequilize.js.map