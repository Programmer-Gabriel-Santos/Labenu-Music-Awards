import { UserDatabase } from "../database/UserDatabase"
import { AuthenticationError } from "../errors/AuthenticationError"
import { EmailInvalid } from "../errors/EmailInvalid"
import { ParamsError } from "../errors/ParamsError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO, User, USER_ROLES } from "../models/User"
import { Authenticator, ITokenPayload } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) {}

    signup = async(input: SignupInputDTO) =>{
        const {name, email, password} = input

        if (!name || !email || !password) {
            throw new ParamsError()
        }

        if (typeof name !== "string" || name.length < 5) {
            throw new ParamsError()
        }

        if (typeof email !== "string" || email.length < 12) {
            throw new ParamsError()
        }

        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new EmailInvalid()
        }

        if (typeof password !== "string" || password.length < 6) {
            throw new AuthenticationError()
        } 

        const userDB = await this.userDatabase.findByEmail(email)
        
        if(userDB){
            throw new Error("Email já cadastrado") 
        }

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id, 
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL
        )

        await this.userDatabase.insertUser(user)

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: SignupOutputDTO = {
            message: "Cadastro realizado com sucesso!",
            token
        }

        return response
    }

    login = async(input: LoginInputDTO)=>{
        const {email, password} = input

        if (!email || !password) {
            throw new ParamsError()
        }

        if (typeof email !== "string" || email.length < 12) {
            throw new EmailInvalid()
        }

        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            throw new EmailInvalid()
        }

        if (typeof password !== "string" || password.length < 3) {
            throw new AuthenticationError()
        }

        const userDB = await this.userDatabase.findByEmail(email)

        if(!userDB){
            throw new AuthenticationError()
        }

        const user = User.toUserModel(userDB)

        const isPasswordIsCorrect = await this.hashManager.compare(password, user.getPassword())

        if(!isPasswordIsCorrect){
            throw new UnauthorizedError()
        }

        const payload: ITokenPayload = {
            id: user.getId(),
            role: user.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: LoginOutputDTO = {
            message: "Login realizado com sucesso!",
            token
        }

        return response
    }

}