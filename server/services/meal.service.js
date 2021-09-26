const { Meal } = require('../models');
const { Sequelize } = require('../models');
const createError = require('http-errors');

/**
 * get meals of User
 * @param user_id
 * @returns {User}
 */
const getMeals = async ({ id }, query) => {
  const order = [
    [query.sortOn || 'meal_date', query.sortBy || 'DESC'],
  ];

  return Meal.findAll({
    where: {
      user_id: id,
      ...(query.text && {
        text: {
          [Sequelize.Op.like]: '%' + query.text + '%'
        }
      }),
      ...(query.startDate && query.endDate && {
        meal_date: {
          [Sequelize.Op.between]: [query.startDate, query.endDate]
        }
      }),
    },
    order,
    offset: query.skip || 0,
    limit: query.limit || 10000,
    raw: true
  });
};

/**
 * creates a meal entry to database
 * @param data
 * @returns {Promise<document>}
 */
const addMeal = async ({ id }, meal) => {
  const resp = await Meal.create({ ...meal, user_id: id });
  return resp.get({ plain: true });
};

/**
 * updates a meal entry to database
 * @param data
 * @returns {Promise<document>}
 */
const updateMeal = async (user, { id }, meal) => {
  const exists = await Meal.findOne({ where: { user_id: user.id, id }, raw: true });
  if (!exists) {
    return createError.BadRequest('meal not found');
  }
  const dataToUpdate = {
    ...(meal.meal_date && { meal_date: meal.meal_date }),
    ...(meal.calories && { text: meal.calories }),
    ...(meal.text && { text: meal.text })
  }
  return await Meal.update(dataToUpdate, { where: { id }, raw: true });
};

/**
 * delete a meal by id
 * @param data
 * @returns {Promise<document>}
 */
const deleteMeal = async (user, { id }) => {
  const exists = await Meal.findOne({ where: { user_id: user.id, id }, raw: true });
  if (!exists) {
    return createError.BadRequest('meal not found');
  }
  return Meal.destroy({ where: { id } });
};

module.exports = { getMeals, addMeal, updateMeal, deleteMeal };