import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use('/api/auth', authRoutes)
app.use('/api/metadata')

app.listen(5000, () => {
  console.log('server is running on port 5000')
})
