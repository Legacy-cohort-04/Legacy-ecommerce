const { Sequelize  } = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize('legacy', process.env.DB_USER, process.env.DB_PASSWORD, {

  host: process.env.DB_HOST,
  dialect: 'mysql' 
});

sequelize
 .authenticate()
 .then(() => {
  console.log("DATABASE CONNECTED");
 })
 .catch((err) => {
  console.log(err);
 });


const db ={}
db.sequelize = sequelize 
db.Sequelize = Sequelize


db.User = require("./models/User")(sequelize , Sequelize)
db.Products = require("./models/Products")(sequelize , Sequelize)
db.Cart = require("./models/Cart")(sequelize , Sequelize)
db.Favourites = require("./models/Favourites")(sequelize , Sequelize)
db.CartProducts=require("./models/CartProducts")(sequelize , Sequelize) //jointable 
db.Favoriteitems=require("./models/Favoriteitems")(sequelize , Sequelize)//jointable 
db.Brands=require("./models/Brands")(sequelize , Sequelize)
db.comments=require("./models/Comments")(sequelize , Sequelize)
db.posts=require("./models/posts")(sequelize , Sequelize)

db.User.hasMany(db.Cart)
db.Cart.belongsTo(db.User)

db.Cart.belongsToMany(db.Products,{through:db.CartProducts})
db.Products.belongsToMany(db.Cart,{through:db.CartProducts})



db.User.hasMany(db.posts)
db.posts.belongsTo(db.User)



db.User.hasMany(db.comments)
db.comments.belongsTo(db.User)

db.posts.hasMany(db.comments)
db.comments.belongsTo(db.posts)



db.User.hasMany(db.Favourites)
db.Favourites.belongsTo(db.User)


db.Products.belongsToMany(db.Favourites , {  through : db.Favoriteitems}) 
db.Favourites.belongsToMany(db.Products , {  through : db.Favoriteitems})

db.Brands.hasMany(db.Products)
db.Products.belongsTo(db.Brands)




  //sequelize.sync({alter : true}).then(() => {
  //console.log(' table created successfully!');
  //}).catch((error) => {
  //console.error('Unable to create table : ', error);
 //});


module.exports= db


