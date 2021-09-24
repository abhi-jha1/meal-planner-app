module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'users',
    timestamps: true,
    classMethods: {
      associate: function (models) {
        User.hasMany(models.Meal)
      }
    }
  });

  return User;
};