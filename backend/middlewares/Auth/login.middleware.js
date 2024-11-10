import { body, validationResult } from "express-validator";

const userValidationRules = [
  body("email").notEmpty().isEmail().withMessage("please enter valid email"),
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
