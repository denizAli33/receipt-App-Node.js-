const Sequelize = require('sequelize');

const sequelize = new Sequelize('receipt-app4','root','',{
    dialect:'mysql',
    host: 'localhost'
});

module.exports= sequelize;