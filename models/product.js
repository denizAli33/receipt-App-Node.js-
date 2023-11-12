const Sequelize = require('sequelize');
const sequelize = require('../utility/database');

const Product = sequelize.define('product', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    malName:Sequelize.STRING,
    malAdet:Sequelize.INTEGER,
    malSafi:Sequelize.FLOAT,
    malFiyat:Sequelize.FLOAT
});

module.exports= Product;