const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Receipt = sequelize.define('receipt', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name:Sequelize.STRING,
    date:Sequelize.STRING
});

module.exports= Receipt;