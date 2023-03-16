import { ShowDatabase } from "../database/ShowDatabase"
import { AuthenticationError } from "../errors/AuthenticationError"
import { AuthorizationError } from "../errors/AuthorizationError"
import { InvalidData } from "../errors/InvalidDate"
import { ParamsError } from "../errors/ParamsError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { BuyTicketInputDTO, CreateShowInputDTO, DeleteTicketInputDTO, IOutputMessage, ITicketDB, Show } from "../models/Show"
import { USER_ROLES } from "../models/User"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class ShowRules {
    constructor(
        private showDatabase: ShowDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    // // createShowTest deve ficar comentado para rodar a aplicação

    // createShowTest = async (input: any) => {
        

    createShow = async (input: CreateShowInputDTO) => {
        let { band, starts_at, token } = input

        if (!band || !starts_at || !token) {
            throw new ParamsError()
        }

        const date = starts_at.split("/")

        if (!Number(date[0]) || !Number(date[1]) || !Number(date[2])) {
            throw new InvalidData()
        }

        if (date[2].length < 4) {
            throw new InvalidData()
        }

        if (Number(date[0]) < 5 || Number(date[1]) < 12) {
            throw new InvalidData()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new AuthenticationError()
        }

        if (payload.role !== USER_ROLES.ADMIN) {
            throw new AuthorizationError()
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

        const response: IOutputMessage = {
            message: "Show agendado com suceso!"
        }

        return response
    }

    getShows = async (): Promise<Show[]> => {

        const shows = await this.showDatabase.selectShows()

        const test = true /* variável necessária para testes, e utilizada apenas por dataBaseMock */

        for(let show of shows){

            const qntTickets = await this.showDatabase.selectQntTickets(show.getId(), test) /* para teste */

            // const qntTickets = await this.showDatabase.selectQntTickets(show.getId())
            show.setTickets(Number(qntTickets))
            
            const date = new Date(Date.parse(show.getStartsAt()))
            
            const day = date.getDate() + 1
            const month = date.getMonth() + 1
            const year = date.getFullYear()
            
            const dateAtual = `0${day}/${month}/${year}`

            show.setStartsAt(dateAtual)
        }

        return shows
    }

    // // 

    // buyTicketTest = async(input: any)=>{ /* byTicketTest deve ficar comentado para rodar a aplicação */

    buyTicket = async(input: BuyTicketInputDTO)=>{
        const {show_id, user_id, token} = input

        if (!show_id || !user_id || !token) {
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if (!payload) {
            throw new AuthenticationError()
        }

        const test =  input.test /* variável nescessária e utilizada apenas em dataBaseMock, para testes */

        const isTicketUser = await this.showDatabase.findTicketByUser(user_id, test) /* linha para testes */

        // const isTicketUser = await this.showDatabase.findTicketByUser(user_id)


        if(isTicketUser){
            throw new Error("Você já possui um ingresso")
        }

        const qntTickets = await this.showDatabase.selectQntTickets(show_id, test) /* linha para testes */

        // const qntTickets = await this.showDatabase.selectQntTickets(show_id)

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

        const response: IOutputMessage = {
            message: "Ingresso reservado com sucesso!"
        }

        return response

    }

    // deleteTicketTest = async(input: any)=>{ /* deletTicketTest deve ficar comentado para rodar a aplicação */


    deleteTicket = async(input: DeleteTicketInputDTO)=>{
        const {show_id, token} = input

        if(!show_id || !token){
            throw new ParamsError()
        }

        const payload = this.authenticator.getTokenPayload(token)

        if(!payload){
            throw new AuthenticationError()
        }

        const test = input.test /* variável nescessária e utilizada apenas em dataBaseMock, para  */

        const ticketExist = await this.showDatabase.findTicketByUser(payload.id, test) /* linha para testes */

        // const ticketExist = await this.showDatabase.findTicketByUser(payload.id)
        
        if(!ticketExist){
            throw new ParamsError()
        }

        if(payload.role !== USER_ROLES.ADMIN && ticketExist?.user_id !== payload.id){
            throw new AuthorizationError()
        }

        await this.showDatabase.deleteTicket(ticketExist.id)

        const response: IOutputMessage = {
            message: "Ingresso restituído"
        }

        return response
    }
}