import { BaseDatabase } from "../../src/database/BaseDatabase"
import { shows, tickets } from "../../src/database/migrations/data"
import { IShowDB, ITicketDB, Show } from "../../src/models/Show"

export class ShowDatabaseMock extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_shows"
    public static TABLE_TICKETS = "Lama_tickets"

    static toShowDBModel = (show: Show): IShowDB => {
        const showDB: IShowDB = {
            id: show.getId(),
            band: show.getBand(),
            starts_at: show.getStartsAt()
        }

        return showDB
    }

    selectShowByDate = async (starts_at: string): Promise<IShowDB | undefined> => {
        const show = shows.find(show => show.starts_at === starts_at)

        return show
    }

    insertShow = async(show: Show):Promise<void> => { }

    selectShows = async(): Promise<Show[]> => {

        const newShows = Show.toShowModel(shows)

        return newShows
    }

    selectQntTickets = async (show_id: string): Promise<number> => {
        const result = shows.filter(show => show.id === show_id)

        return result.length
    }

    findTicketByUser = async (user_id: string): Promise<ITicketDB | undefined> => {
        const result: ITicketDB | undefined = tickets.find(ticket => ticket.user_id === user_id)
        console.log(result)
        return result
    }

    insertTicket = async (input: ITicketDB): Promise<void> => { }

    deleteTicket = async (id: string): Promise<void> => { }
}