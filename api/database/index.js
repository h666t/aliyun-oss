const { Sequelize } = require('sequelize');
const path = require("path")

let sequelize = "";

const _startDatabase =  function(){
    if(!sequelize){
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: path.resolve(__dirname, '../data/sqlite.sqlite')
        });
    };
};

const _checkIsDatabasecontect = async function(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return 'Connection has been established successfully.'
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw new Error(error)
    }
}

const _getSequelizeClient = function () {
    if(sequelize){
        return sequelize
    } else {
        _startDatabase()
        return sequelize
    }
}

module.exports = {
    _startDatabase,
    _checkIsDatabasecontect,
    _getSequelizeClient
}