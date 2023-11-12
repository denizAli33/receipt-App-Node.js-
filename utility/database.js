const Sequelize = require('sequelize');

const sequelize = new Sequelize('receipt-app3','root','MYSQL1234',{
    dialect:'mysql',
    host: 'localhost'
});

module.exports= sequelize;