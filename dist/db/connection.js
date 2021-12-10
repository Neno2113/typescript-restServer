"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_name = process.env.DB_NAME || 'databse';
const db_user = process.env.DB_USER || 'user';
const db_host = process.env.DB_HOST || 'host';
// const db_password : string = process.env.DB_PASSWORD || 'password' ;
const db = new sequelize_1.Sequelize(db_name, db_user, '', {
    host: db_host,
    dialect: 'mariadb',
    // logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map