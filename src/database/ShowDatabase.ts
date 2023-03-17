import { IShowDB, ITicketDB, Show } from "../models/Show"
import { BaseDataBase } from "./BaseDataBase"

export class ShowDatabase extends BaseDataBase {
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
       const show:IShowDB[] = await this.getConnection()(ShowDatabase.TABLE_SHOWS)
        .select()
        .where({starts_at})

        return show[0]
    }

    insertShow = async(show: Show): Promise<void> =>{
        const showDB = ShowDatabase.toShowDBModel(show)

        await this.getConnection()(ShowDatabase.TABLE_SHOWS)
        .insert(showDB)
    }

    selectShows = async(): Promise<Show[]>=>{
        const shows: IShowDB[] = await this.getConnection()(ShowDatabase.TABLE_SHOWS)

        const newShows = Show.toShowModel(shows)

        return newShows
    }

    selectQntTickets = async(show_id: string, test: boolean): Promise<number>=>{  /* para teste */

        const result = await this.getConnection()(ShowDatabase.TABLE_TICKETS)
        .count("show_id AS tickets")
        .where({show_id})

        return result[0].tickets as number
    }

    findTicketByUser = async(user_id: string, test: boolean): Promise<ITicketDB | undefined>=>{ /* para teste */
        
        const result: ITicketDB[] = await this.getConnection()(ShowDatabase.TABLE_TICKETS)
        .where({user_id})

        return result[0]
    }

    insertTicket = async(input: ITicketDB): Promise<void>=>{
        await this.getConnection()(ShowDatabase.TABLE_TICKETS)
        .insert(input)
    }

    deleteTicket = async(id: string):Promise<void> =>{
        await this.getConnection()(ShowDatabase.TABLE_TICKETS)
        .delete()
        .where({id})
    }
}