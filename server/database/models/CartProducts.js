module.exports = (sequelize, DataTypes) => {
  const CartProducts = sequelize.define("CartProducts",{
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    },
    { timestamps: false }
  );
  return CartProducts;
};
