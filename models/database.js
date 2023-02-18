import { Sequelize } from 'sequelize';

export default new Sequelize({
    dialect: 'postgres',
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 5432,
    logging: false
});
