const router = require("express").Router();

const authMiddleware = require("../middleware/authmiddleware");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getSummary
} = require("../controllers/transactionController");

router.post("/", authMiddleware, addTransaction);

router.get("/", authMiddleware, getTransactions);

router.delete("/:id", authMiddleware, deleteTransaction);

router.get("/summary",authMiddleware,getSummary);

module.exports = router;
