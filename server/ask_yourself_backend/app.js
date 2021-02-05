const createError   = require("http-errors");
const express       = require("express");
const cookieParser  = require("cookie-parser");
const logger        = require("morgan");
const { sequelize } = require("./models");
// const auth          = require("./middlewares/auth");

const usersRouter   = require("./routes/users");
const testRouter    = require("./routes/test");
const sessionRouter = require("./routes/session");
const groupsRouter  = require("./routes/groups");
require('dotenv').config();
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// sequelize init
sequelize.sync();


// Routers
app.use("/users", usersRouter);
app.use("/session", sessionRouter);
app.use("/tests", testRouter);
app.use("/groups", groupsRouter);
// app.use("/tests", auth.authenticateUser, testRouter);
// app.use("/groups", auth.authenticateUser, groupsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send("error");
});

module.exports = app;
