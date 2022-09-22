const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

dotenv.config({ path: ".env-local" });

const PORT = process.env.PORT || 3000;

const app = express();

/**
 * Middleware
 */
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
const logger = app.use(morgan('combined', { stream: accessLogStream }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routes
 */

app.get("/", (req, res) => {
  logger(req, res, function (err) {
    if (err) return done(err);
    res.setHeader("content-type", "text/plain");
    res.end("You need to specify a route");
  });
});

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

/**
 * Start server
 */

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
