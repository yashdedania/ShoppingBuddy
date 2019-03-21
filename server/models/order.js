const SERVER_API = process.env.SERVER_API;
module.exports = (sequelize, DataTypes) => {

  const order = sequelize.define('order', {
    paid: {
    	type: DataTypes.BOOLEAN,
    	allowNull: true,
      defaultValue:false
    },
    
  }, 
  {
    /*indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]*/
  });

  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.user, { foreignKey: 'user_order' });
    order.hasMany(models.products,{foreignKey:'order_products'});
  };
  return order;
};