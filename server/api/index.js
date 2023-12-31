var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("../routes/index");
var categoriesRouter = require("../routes/categories");
var productsRouter = require("../routes/products");
var usersRouter = require("../routes/users");

var app = express();

//connect mongodb
var mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://trietle101:trietle101@cluster0.gpqr65b.mongodb.net/casaloman?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));

app.use(cors({ origin: "*" }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/users", usersRouter);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

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

module.exports = app;
