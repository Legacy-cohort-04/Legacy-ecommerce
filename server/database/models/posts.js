module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define('posts', {
    
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
     
    }, {
      timestamps: false
    });
  
    return posts;
  };
  