var createError = require("http-errors");
var express = require("express");
var dbConnect = require("./db/dbConnect");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var PostRouter = require("./routes/PostRouter");

var app = express();
dbConnect();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3001", // Thay đổi theo domain frontend của bạn
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", PostRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(8080, () => {
  console.log("server listening on port 8080");
});
module.exports = app;
