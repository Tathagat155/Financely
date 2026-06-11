const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const transactionRoutes = require("./routes/transactionRoutes")

const app = express()

app.use(cors())
app.use(express.json())
 // hNIU6lwRKVFIoIXu
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
  });

app.listen(3000, ()=> console.log("Server running on port 3000"))  