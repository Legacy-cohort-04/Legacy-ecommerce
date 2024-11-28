module.exports =  (sequelize , DataTypes)  => {
    const Favoriteitems = sequelize.define('Favoriteitems', {
    
        added_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          }
        
    }  , { timestamps: false })  
    return Favoriteitems
    }