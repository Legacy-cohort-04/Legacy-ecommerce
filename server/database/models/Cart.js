
module.exports =  (sequelize , DataTypes)  => {
    const Cart = sequelize.define('Cart', {
        totalItems: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        }
        
    }  , { timestamps: false })  
    return Cart
    
    }
    
   

