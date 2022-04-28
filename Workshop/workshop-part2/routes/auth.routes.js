const router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const userValidator = require("../middleware/user-validator.middleware");

router.post("/signup", userValidator, AuthController.signUpUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
