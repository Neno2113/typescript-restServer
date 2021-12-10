import { Sequelize } from 'sequelize';

const db_name : string = process.env.DB_NAME || 'databse' ;
const db_user : string = process.env.DB_USER || 'user' ;
const db_host : string = process.env.DB_HOST || 'host' ;
// const db_password : string = process.env.DB_PASSWORD || 'password' ;


const db = new Sequelize( db_name , db_user, '', {
    host: db_host,
    dialect: 'mariadb',
    // logging: false
})



export default db;