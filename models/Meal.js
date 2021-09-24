module.exports = function (sequelize, DataTypes) {
  const Meal = sequelize.define("Meal", {
    id: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
    }
    },
    meal_date: { type: DataTypes.DATE, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    calories: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'meals',
    timestamps: true,
    classMethods: {
      associate: function (models) {
        Meal.belongsTo(models.User);
      }
    }
  });

  return Meal;
};