import express from 'express';
const app = express();

import 'express-async-errors';

import morgan from 'morgan'

import dotenv from 'dotenv'
dotenv.config()


//db and authticateUser
import connectDB from './db/connection.js';


//Routes
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

//Middleware
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))   // this shows which api is hit and whats its status in the console
}

app.use(express.json())

app.get('/api/v1', (req, res) => {
  res.json({ msg: "Welcome!!" });
})

//Routers
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

//not-foundMiddleware
app.use(notFoundMiddleware)

//Error Middleware
app.use(errorHandlerMiddleware)

//Port
const port = process.env.PORT || 5000;

//connectDB
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on ${port}...`);
    })
  } catch (error) {
    console.log(error)
  }
}


start()