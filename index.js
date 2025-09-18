const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");
const { resolve } = require("path");

const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set in .env");
  process.exit(1);
}

mongoose.connect(MONGO_URI).then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// app.use(express.static("static"));
app.use("/", tasksRouter);
app.get("/", (req, res) => res.sendFile(resolve(__dirname, "pages/index.html")));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
