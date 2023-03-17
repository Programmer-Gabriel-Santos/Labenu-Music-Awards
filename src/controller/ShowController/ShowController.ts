import { Request, Response } from "express";
import { ShowRules } from "../../Rules/ShowRules"; 
import { BuyTicketInputDTO, CreateShowInputDTO, DeleteTicketInputDTO } from "../../models/Show"

export class ShowController {
    constructor(
        private showRules: ShowRules
    ) { }

    createShow = async (req: Request, res: Response) => {
        try {
            const input: CreateShowInputDTO = {
                band: req.body.banda,
                starts_at: req.body.data,
                token: req.headers.authorization as string
            }

            const response = await this.showRules.createShow(input)

            res.status(201).send(response)

        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(500).send("Um erro inesperado ocorreu")
            }
        }
    }

    getShows = async (req: Request, res: Response) => {
        try {
            const response = await this.showRules.getShows()

            res.send(response)

        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(500).send("Um erro inesperado ocorreu")
            }
        }
    }

    buyTicket = async (req: Request, res: Response) => {
        try {
            const input: BuyTicketInputDTO = {
                show_id: req.body.showId,
                user_id: req.body.userId,
                token: req.headers.authorization as string,
                test: false
            }

            const response = await this.showRules.buyTicket(input)

            res.send(response)

        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(500).send("Um erro inesperado ocorreu")
            }
        }
    } 

    deleteTicket = async (req: Request, res: Response) => {
        try {
            const input: DeleteTicketInputDTO ={
                token: req.headers.authorization as string,
                show_id: req.params.id,
                test: false
            }

            const response = await this.showRules.deleteTicket(input)

            res.send(response)

        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).send({ message: error.message })
            } else {
                res.status(500).send("Um erro inesperado ocorreu")
            }
        }
    }
}