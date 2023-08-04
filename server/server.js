import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import runApp from './utils/runApp.js';
import { protect } from './middleware/protectMiddleware.js';

const app = express();
const port = process.env.PORT || 4000

app.use(
  cors({
    origin: "http://localhost:3000",  //Your Frontend Application
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


//This route will need to be protected
app.get('/', (req, res) => {
  res.send('connected!')
})

app.use('/users', userRouter)


runApp(app, port)