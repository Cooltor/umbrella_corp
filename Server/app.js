const express = require("express");
const morgan = require("morgan");
const benefitRouter = require("./routes/benefitRoutes");
//const userRouter = require('./routes/userRoutes');

const app = express();

// 1. MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware 🤖");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', createTour);
//app.patch('/api/v1/tours/:id', updateTour);
//app.delete('/api/v1/tours/:id', deleteTour);

// 3. ROUTES

app.use("/api/v1/benefits", benefitRouter);
//app.use("/api/v1/users", userRouter);

// 4. START SERVER
module.exports = app;
