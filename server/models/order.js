const SERVER_API = process.env.SERVER_API;
module.exports = (sequelize, DataTypes) => {

  const order = sequelize.define('order', {
    paid: {
    	type: DataTypes.BOOLEAN,
    	allowNull: true,
      defaultValue:false
    },
    quantity:{
      type:DataTypes.JSONB,
      defaultValue:{},
    },
    order_verify:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    total:{
      type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue:0,
        get:function(){
            return parseFloat(this.getDataValue('total'))
        },
        set:function(val){
            this.setDataValue('total', parseFloat(val));
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

  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.user, { foreignKey: 'user_order' });
    order.hasMany(models.products,{foreignKey:'order_products'});
  };
  return order;
};