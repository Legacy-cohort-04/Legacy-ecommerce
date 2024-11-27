const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: true,
            defaultValue: 'user',
        },
    }, { 
        timestamps: false,
   
    });
    return User;
}