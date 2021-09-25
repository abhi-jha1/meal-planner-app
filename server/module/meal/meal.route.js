const { Router } = require('express');
const {
  body, param, query, validationResult,
} = require('express-validator');
const { verifyAccessToken } = require('../../services/jwt.service');
const { getMeals, addMeal, updateMeal, deleteMeal } = require('./meal.ctrl');

const mealSchema = [
  body('meal_date', 'meal_date required').escape(),
  body('calories', 'calories required as number').escape().isNumeric(),
  body('text', 'text description required').escape().isString(),
];

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({ errors: errors.array() });
};

const router = Router();

router.get(
  '/meals',
  verifyAccessToken,
  getMeals,
);

router.post(
  '/meals',
  validate(mealSchema),
  verifyAccessToken,
  addMeal,
);

router.put(
  '/meal/:id',
  validate(mealSchema.concat(
    param('id', 'Please enter a valid meal id in param').escape().isString(),
  )),
  verifyAccessToken,
  updateMeal,
);

router.delete(
  '/meal/:id',
  validate([param('id', 'Please enter a valid meal id in param').escape().isString()]),
  verifyAccessToken,
  deleteMeal,
);

module.exports = router;
