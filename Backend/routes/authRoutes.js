const router = require("express").Router();

const { signup, login} = require("../controllers/authController");

const authMiddleware = require("../middleware/authmiddleware");

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
