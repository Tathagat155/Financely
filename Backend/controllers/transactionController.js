const Transaction = require("../models/Transaction");

const addTransaction = async (req, res) => {
  try {
    const { title, amount, type } = req.body;

    const transaction = await Transaction.create({
      user: req.userId,
      title,
      amount,
      type
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { search, type, sort, page = 1, limit = 5 } = req.query;

    const query = {
      user: req.userId,
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (type === "income" || type === "expense") {
      query.type = type;
    }

    let sortOption = {}
     

    switch (sort) {
      case "high":
        sortOption = {
          amount: -1,
        };
        break;
      case "low":
        sortOption = {
          amount: 1,
        };
        break;
      case "oldest":
        sortOption = {
          createdAt: 1,
        };
        break;
      case "latest":
        sortOption = {
          createdAt: -1,
        };
        break;
      default:
        sortOption = {
          createdAt: -1,
        };
    }

    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort(sortOption)
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.status(200).json({
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      totalTransactions: total,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    await transaction.deleteOne();

    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.userId
    });

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        income += transaction.amount;
      } else if (transaction.type === "expense") {
        expense += transaction.amount;
      }
    });

    const balance = income - expense;

    res.json({
      income,
      expense,
      balance
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  getSummary
};
