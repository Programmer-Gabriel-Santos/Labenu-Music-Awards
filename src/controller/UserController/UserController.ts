import { Request, Response } from "express";
import { UserRules } from "../../Rules/UserRules"; 
import { LoginInputDTO, SignupInputDTO } from "../../models/User"

export class UserController {
    constructor(
        private userRules: UserRules
    ) {}
    
    signup = async(req: Request, res: Response)=>{
        try {
            const input: SignupInputDTO ={
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.userRules.signup(input)

            res.status(201).send(response)

        } catch (error: unknown) {

            if(error instanceof Error){
                res.status(400).send({message: error.message})
            } else {
                res.status(500).send({message: "Um erro inesperado ocorreu :/"})
            }
        }
    }

    login = async(req: Request, res: Response) =>{
        try {
            const input: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }
            
            const response = await this.userRules.login(input)

            res.send(response)

        } catch (error: unknown) {
            if(error instanceof Error){
                res.status(400).send({message: error.message})
            }else{
                res.status(500).send("Um erro inesperado ocorreu")
            }
        }
    }
}
