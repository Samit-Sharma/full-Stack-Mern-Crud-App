require("dotenv").config();
const express = require("express");
const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");
const userRouter = require("./routes/user.routes");
const authMiddleWare = require("./middleware/auth.middleware");
const cors = require("cors");

// database connection
databaseConnection().catch((err) => {
  console.log("Database connection error:", err);
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running", success: true });
});

app.use("/book", authMiddleWare, bookRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`);
});
