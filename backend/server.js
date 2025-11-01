import express from "express"
import dotenv from "dotenv"
import connectDB from './config/db.js'
import cors from 'cors'
import cookieParser from "cookie-parser"
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

dotenv.config()
connectDB()



const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "https://auth2-1-jat0.onrender.com",
    credentials: true
}))

app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)



app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})