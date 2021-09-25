const HttpStatus = require('http-status-codes');
const mealService = require('../../services/meal.service');

/**
 *
 * @param req
 * @param res
 */
const getMeals = async (req, res) => {
  const resp = await mealService.getMeals(req.user, req.query);
  res.status(HttpStatus.StatusCodes.OK).json(resp);
};

/**
 *
 * @param req
 * @param res
 */
 const addMeal = async (req, res) => {
  const resp = await mealService.addMeal(req.user, req.body);
  res.status(HttpStatus.StatusCodes.OK).json(resp);
};

/**
 *
 * @param req
 * @param res
 */
 const updateMeal = async (req, res) => {
  const resp = await mealService.updateMeal(req.user, req.params, req.body);
  res.status(HttpStatus.StatusCodes.OK).json(resp);
};

/**
 *
 * @param req
 * @param res
 */
 const deleteMeal = async (req, res) => {
  await mealService.deleteMeal(req.user, req.params);
  res.status(204).json();
};

module.exports = { getMeals, addMeal, updateMeal, deleteMeal };
