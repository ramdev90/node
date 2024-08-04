const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { globalErrorHandler } = require("./utils/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3001" }));

// Import Routes
const authRoutesRest = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");

// Use Routes
app.use("/api/auth", authRoutesRest);
app.use("/api", productRoutes);
// app.use("/api/shop", shopRoutesRest);
// app.use("/api/admin", adminRoutesRest);

app.use(globalErrorHandler);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
