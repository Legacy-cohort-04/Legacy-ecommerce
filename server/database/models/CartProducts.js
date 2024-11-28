module.exports = (sequelize, DataTypes) => {
  const CartProducts = sequelize.define("CartProducts",{
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    },
    { timestamps: false }
  );
  return CartProducts;
};
