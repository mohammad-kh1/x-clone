import { body, validationResult } from "express-validator";

const userValidationRules = [
  body("username").notEmpty().withMessage("please enter valid username"),
  body("password")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("plaese enter password"),
];

const handlevalidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

const validateLoginInput = [...userValidationRules, handlevalidationErrors];

export default validateLoginInput;
