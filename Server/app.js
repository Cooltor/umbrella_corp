const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErroHandler = require("./controllers/errorController");
const benefitRouter = require("./routes/benefitRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

// 1. MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3. ROUTES

app.use("/api/v1/benefits", benefitRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErroHandler);

// 4. START SERVER
module.exports = app;
