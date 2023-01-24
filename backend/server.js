const express = require("express");
var cors = require("cors");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
var cookieParser = require("cookie-parser");
var csrf = require("csurf");
const port = process.env.PORT || 8000;

//create express APP
const app = express();

//MiddleWare setup

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// csrf protection
var csrfProtection = csrf({ cookie: true });

app.get("/api/csrf-token", csrfProtection, function (req, res) {
  res.json({ csrfToken: req.csrfToken() });
});

//db Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB_CONNECTION, {})
  .then(() => console.log("DATABASE IS CONNECTED"))
  .catch((err) => console.log("DATABASE CONNECTION FAILED", err));

readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
app.listen(port, () => console.log(`Backend is Listening on port ${port}`));
