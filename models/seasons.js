const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Season = sequelize.define('season',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:Sequelize.CHAR
});

module.exports= Season;