const { Sequelize, DataTypes } = require('sequelize');
const {_getSequelizeClient} = require("./index")

const _defineUserModel = function(){
    let sequelize =  _getSequelizeClient();
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
    });
}

const _defineAllModel = async function(){
    let sequelize =  _getSequelizeClient();
    _defineUserModel();
    await sequelize.sync({ force: true });
}

module.exports = {
    _defineAllModel
}