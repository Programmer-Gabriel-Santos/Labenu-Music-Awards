import { ShowDatabase } from "../database/ShowDatabase"
import { AuthenticationError } from "../errors/AuthenticationError"
import { AuthorizationError } from "../errors/AuthorizationError"
import { ParamsError } from "../errors/ParamsError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { BuyTicketInputDTO, CreateShowInputDTO, DeleteTicketInputDTO, ITicketDB, Show } from "../models/Show"
import { USER_ROLES } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class ShowBusiness {
    constructor(
        private showDatabase: ShowDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    createShow = async (input: CreateShowInputDTO) => {
        let { band, starts_at, token } = input

        if (!band || !starts_at || !token) {
            throw new ParamsError()
        }

        const date = starts_at.split("/")

        if (!Number(date[0]) || !Number(date[1]) || !Number(date[2])) {
            throw new Error("Formato de 'data' inválido")
        }

        if (date.length < 3) {
            throw new Error("Formato de 'data' inválido")
        }

        if (Number(date[0]) < 5 || Number(date[1]) < 12) {
            throw new Error("Um show não pode ser agendado para antes do início do evento")
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new AuthenticationError()
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new UnauthorizedError()
        }

        const dateToFormatEua = starts_at.split("/").reverse().join("-")
        starts_at = dateToFormatEua

        const showDB = await this.showDatabase.selectShowByDate(dateToFormatEua)

        if (showDB) {
            throw new Error("Essa data já está reservada")
        }

        const id = this.idGenerator.generate()

        const show = new Show(
            id,
            band,
            starts_at
        )

        await this.showDatabase.insertShow(show)

        const response = {
            message: "Show agendado com suceso!"
        }

        return response
    }

    getShows = async (): Promise<Show[]> => {

        const shows = await this.showDatabase.selectShows()

        for(let show of shows){
            const qntTickets = await this.showDatabase.selectQntTickets(show.getId())
            
            show.setTickets(Number(qntTickets))
            
            const date = new Date(show.getStartsAt())
            
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            
            const dateAtual = `${day}/${month}/${year}`

            show.setStartsAt(dateAtual)
        }

        return shows
    }

    buyTicket = async(input: BuyTicketInputDTO)=>{
        const {show_id, user_id, token} = input

        if (!show_id || !user_id || !token) {
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new AuthenticationError()
        }

        const isTicketUser = await this.showDatabase.findTicketByUser(user_id)

        if(isTicketUser){
            throw new Error("Você já possui um ingresso")
        }

        const qntTickets = await this.showDatabase.selectQntTickets(show_id)

        if(qntTickets >= 5000){
            throw new Error("Ingressos esgotados :/")
        }

        const id = this.idGenerator.generate()

        const inputDB: ITicketDB = {
            id,
            show_id, 
            user_id
        }

        await this.showDatabase.insertTicket(inputDB)

        const response = {
            message: "Ingresso reservado com sucesso!"
        }

        return response

    }

    deleteTicket = async(input: DeleteTicketInputDTO)=>{
        const {show_id, token} = input

        if(!show_id || !token){
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload){
            throw new AuthenticationError()
        }

        const ticketExist = await this.showDatabase.findTicketByUser(payload.id)

        if(!ticketExist){
            throw new ParamsError()
        }

        if(payload.role !== USER_ROLES.ADMIN && ticketExist?.user_id !== payload.id){
            throw new AuthorizationError()
        }

        await this.showDatabase.deleteTicket(ticketExist.id)

        const response = {
            message: "Ingresso restituído"
        }

        return response
    }
}