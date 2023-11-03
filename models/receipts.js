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
    date:Sequelize.STRING,

    malBirName:Sequelize.STRING,
    malBirAdet:Sequelize.INTEGER,
    malBirSafi:Sequelize.DECIMAL(65,2),
    malBirFiyat:Sequelize.DECIMAL(65,2),
    malBirTutar:Sequelize.DECIMAL(65,2),

    malIkiName:Sequelize.STRING,
    malIkiAdet:Sequelize.INTEGER,
    malIkiSafi:Sequelize.DECIMAL(65,2),
    malIkiFiyat:Sequelize.DECIMAL(65,2),
    malIkiTutar:Sequelize.DECIMAL(65,2),

    malUcName:Sequelize.STRING,
    malUcAdet:Sequelize.INTEGER,
    malUcSafi:Sequelize.DECIMAL(65,2),
    malUcFiyat:Sequelize.DECIMAL(65,2),
    malUcTutar:Sequelize.DECIMAL(65,2),
    
    totalAdet:Sequelize.INTEGER,
    totalSafi:Sequelize.DECIMAL(65,2),
    totalTutar:Sequelize.DECIMAL(65,2),

    ortalamaSafi:Sequelize.DECIMAL(65,2),
    ortalamaTutar:Sequelize.DECIMAL(65,2)
});

module.exports= Receipt;