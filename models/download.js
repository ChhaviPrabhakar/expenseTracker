const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const DownloadedExpense = sequelize.define('downloadedExpense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    fileURL: Sequelize.STRING
});

module.exports = DownloadedExpense;