import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import { showRouter } from './router/showRouter'
import { userRouter } from './router/userRouter'
import { Migrations } from './database/migrations/migrations'

dotenv.config()

const app = express()
app.use(express.json()) 
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

const migrations = new Migrations()

migrations.createTables()

app.use("/users", userRouter)
app.use("/shows", showRouter)