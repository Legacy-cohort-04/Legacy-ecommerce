module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
    
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
     
    }, {
      timestamps: false
    });
  
    return comments;
  };
  