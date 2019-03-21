const SERVER_API = process.env.SERVER_API;
module.exports = (sequelize, DataTypes) => {

  const products = sequelize.define('products', {
    name: {
    	type: DataTypes.STRING,
    	allowNull: true,
      defaultValue:""
    },
    prodmap: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:SERVER_API+"/public/1.jpg"
    },
    details:{
      type:DataTypes.TEXT,
      defaultValue:""
    },
    amount:{
      type:DataTypes.FLOAT,
      allowNull: false,
        defaultValue:0,
        get:function(){
            return parseFloat(this.getDataValue('amount'))
        },
        set:function(val){
            this.setDataValue('amount', parseFloat(val));
        }
    }
    
  }, 
  {
    /*indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]*/
  });

  products.associate = function(models) {
    // associations can be defined here
    products.belongsToMany(models.order,{through:'order_products'});
  };
  return products;
};