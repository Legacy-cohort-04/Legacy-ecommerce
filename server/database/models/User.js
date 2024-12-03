const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
    
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
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
        background: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            validate: {
                isUrl: true 
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        
        day: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 31
            }
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1900,
                max: new Date().getFullYear()  
            }
        },
        month: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December']]  
            }
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
