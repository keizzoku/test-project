import { Sequelize } from 'sequelize';
import sequelize from './database.js';

export default sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    photo: {
        type: Sequelize.STRING,
    }
});















