const Sequelize = require('sequelize');
const database = require("./db");


const Register = database.define('register', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

})

module.exports = Register;