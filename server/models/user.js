const SERVER_API = process.env.SERVER_API;
module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileno: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    imageuri: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: SERVER_API + '/public/user/personimage.png'
    },
    imagename: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'personimage.png'
    },
    currentorderid: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "empty"
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 2000,
      get: function () {
        return parseFloat(this.getDataValue('budget'))
      },
      set: function (val) {
        this.setDataValue('budget', parseFloat(val));
      }
    },
    notificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
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

  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.activity, { foreignKey: 'ract_user_id' });
    user.hasMany(models.order, { foreignKey: 'user_order' });
  };
  return user;
};
