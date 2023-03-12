import { ShowBusiness } from "../../src/business/ShowBusiness"
import { BuyTicketInputDTO, CreateShowInputDTO, DeleteTicketInputDTO, IShowDB } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/ShowDatabaseMock"

describe("Testando a ShowBusiness", () => {
    const showsBusiness = new ShowBusiness(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()

    )

    test("testando o método de criar shows", async ()=>{
        const input: CreateShowInputDTO ={
            band: "teste",
            starts_at: "6/12/2022",
            token: "token-mock-admin"
        }

        const response = await showsBusiness.createShow(input)

        expect(response.message).toBe("Show agendado com suceso!")
    })


    test("testando o método de pegar todos os shows", async()=>{
        const response = await showsBusiness.getShows()

        const shows: IShowDB[] = [
            {
                id: "201",
                band: "Foo Fighters",
                starts_at: "5/12/2022"
            },
            {
                id: "202",
                band: "System of a Down",
                starts_at: "6/12/2022"
            },
            {
                id: "203",
                band: "Evanescence",
                starts_at: "7/12/2022"
            }
        ]

        const responseToDBModel = ShowDatabaseMock.toShowDBModel(response[0])
        expect(responseToDBModel).toEqual(shows[0])
    })

    test("testando o método de comprar ingresso", async()=>{
        const input: BuyTicketInputDTO ={
            show_id: "201",
            user_id: "0009",
            token: "token-mock-normal"
        }

        const response = await showsBusiness.buyTicket(input)

        expect(response.message).toBe("Ingresso reservado com sucesso!")
    })

    test("testando o mótodo de cancelar a reseserva de um ingresso",async()=>{
        const input: DeleteTicketInputDTO ={
            show_id: "201",
            token: "token-mock-normal"
        }
        
        const response = await showsBusiness.deleteTicket(input)

        expect(response.message).toBe("Ingresso restituído")
    })

})
