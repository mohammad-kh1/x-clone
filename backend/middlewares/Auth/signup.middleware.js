import { body, validationResult } from "express-validator";

const MIN_PASSWORD_LENGTH = 6;

const userValidationRules = [
  body("email")
    .isEmail()
    .withMessage("please enter valid email address")
    .escape()
    .trim()
    .notEmpty(),

  body("password")
    .isLength(MIN_PASSWORD_LENGTH)
    .withMessage(`password must be at least ${MIN_PASSWORD_LENGTH}`)
    .custom((value, { req }) => {
      if (value === req.body.confirmPassword) {
        return true;
      }
      throw new Error("Passwords do not match");
    }),

  body("confirmPassword").custom((value, { req }) => {
    if (value === req.body.password) {
      return true;
    }
  }),

  body("fullName").notEmpty().trim().escape().withMessage("enter valid name"),
  body("username")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("enter valid username"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateUserInput = [...userValidationRules, handleValidationErrors];
export default validateUserInput;
