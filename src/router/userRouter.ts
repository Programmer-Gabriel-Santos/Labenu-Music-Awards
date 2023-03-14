import { Router } from 'express'
import { UserRules } from '../Rules/UserRules'
import { UserController } from '../controller/UserController/UserController'
import { UserDatabase } from '../database/UserDatabase'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'

export const userRouter = Router()

const userController = new UserController(
    new UserRules(
        new UserDatabase(),
        new IdGenerator(),
        new HashManager(),
        new Authenticator()
    )
)

userRouter.post("/signup", userController.signup)

userRouter.post("/login", userController.login)