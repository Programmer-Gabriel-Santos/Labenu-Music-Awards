export interface IShowDB {
    id: string,
    band: string,
    starts_at: string
}

export interface ITicketDB {
    id: string,
    show_id: string,
    user_id: string
}

export class Show {
    constructor(
        private id: string,
        private band: string,
        private starts_at: string,
        private tickets: number = 0
    ) {}

    static toShowModel = (show: IShowDB[])=>{
        const shows = show.map((item)=>{
            return new Show(
                item.id,
                item.band,
                item.starts_at
            )
        })
        return shows
    }

    public getId = () => {
        return this.id
    }

    public getBand = () => {
        return this.band
    }

    public getStartsAt = () => {
        return this.starts_at
    }

    public getTickets = () => {
        return this.tickets
    }

    public setId = (newId: string) => {
        this.id = newId
    }

    public setBand = (newBand: string) => {
        this.band = newBand
    }

    public setStartsAt = (newStartsAt: string) => {
        this.starts_at = newStartsAt
    }

    public setTickets = (newTickets: number) => {
        this.tickets = newTickets
    }
}

export interface CreateShowInputDTO{
    band: string,
    starts_at: string,
    token: string
}

export interface BuyTicketInputDTO{
    show_id: string,
    user_id: string,
    token: string
}

export interface DeleteTicketInputDTO{
    show_id: string,
    token: string
}