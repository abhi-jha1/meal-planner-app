const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { login, signup } = require('./auth.ctrl');

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({ errors: errors.array() });
};

const router = Router();

router.post(
  '/login',
  validate([
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter password of minimum 8 characters').escape().isLength({
      min: 8,
    }),
  ]),
  login,
);

router.post(
  '/signup',
  validate([
    body('username', 'Please enter username of minimum 3 characters').escape().isLength({
      min: 3,
    }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter password of minimum 8 characters').escape().isLength({
      min: 8,
    }),
  ]),
  signup,
);


module.exports = router;
