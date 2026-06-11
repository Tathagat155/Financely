const router = require("express").Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
} = require("../controllers/transactionController");

router.post("/", authMiddleware, addTransaction);

router.get("/", authMiddleware, getTransactions);

router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;
