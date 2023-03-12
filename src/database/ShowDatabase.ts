import { IShowDB, ITicketDB, Show } from "../models/Show"
import { BaseDatabase } from "./BaseDatabase"

export class ShowDatabase extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_shows"
    public static TABLE_TICKETS = "Lama_tickets"

    static toShowDBModel = (show: Show):IShowDB => {
        const showDB: IShowDB = {
            id: show.getId(),
            band: show.getBand(),
            starts_at: show.getStartsAt()
        }
        
        return showDB
    }


    selectShowByDate = async(starts_at: string): Promise<IShowDB | undefined> =>{
       const show:IShowDB[] = await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS)
        .select()
        .where({starts_at})

        return show[0]
    }

    insertShow = async(show: Show): Promise<void> =>{
        const showDB = ShowDatabase.toShowDBModel(show)

        await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS)
        .insert(showDB)
    }

    selectShows = async(): Promise<Show[]>=>{
        const shows: IShowDB[] = await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS)

        const newShows = Show.toShowModel(shows)

        return newShows
    }

    selectQntTickets = async(show_id: string): Promise<number>=>{
        const result = await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
        .count("show_id AS tickets")
        .where({show_id})

        return result[0].tickets as number
    }

    findTicketByUser = async(user_id: string): Promise<ITicketDB | undefined>=>{
        const result: ITicketDB[] = await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
        .where({user_id})

        return result[0]
    }

    insertTicket = async(input: ITicketDB): Promise<void>=>{
        await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
        .insert(input)
    }

    deleteTicket = async(id: string):Promise<void> =>{
        await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
        .delete()
        .where({id})
    }
}