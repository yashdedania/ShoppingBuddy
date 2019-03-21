
module.exports = (sequelize, DataTypes) => {

  const auth = sequelize.define('auth', {
    user_details: {
    	type: DataTypes.TEXT,
    	allowNull: false,
    },
    hashed_id: {
    	type: DataTypes.STRING,
    	allowNull: false,
    	unique: true,
	  },
    random_string: {
    	type: DataTypes.STRING,
    	allowNull: false,
    },
    session_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, 
  {
    indexes: [
        {
            unique: true,
            fields: ['hashed_id','session_key']
        }
    ]
  });

  auth.associate = function(models) {
    // associations can be defined here
  };
  return auth;
};

