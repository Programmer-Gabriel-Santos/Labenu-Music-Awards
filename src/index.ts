import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from "dotenv"

import { showRouter } from './router/showRouter'
import { userRouter } from './router/userRouter'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.get('/teste', (req: Request, res: Response) => {
    console.log('teste')
    res.send('Hello World!')
})

app.use("/users", userRouter)
app.use("/shows", showRouter)