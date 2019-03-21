module.exports = (sequelize, DataTypes) => {
    const activity = sequelize.define('activity', {
        activity_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        activity_detail:{
            type:DataTypes.TEXT,
            default:''
        }
    },{

    });
    activity.associate = function(models) {
        // associations can be defined here
        activity.belongsTo(models.user, {foreignKey:'ract_user_id'});
    };

    return activity;
}



