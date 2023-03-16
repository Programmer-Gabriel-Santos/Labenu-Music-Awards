import { ShowRules } from "../../src/Rules/ShowRules"
import { BuyTicketInputDTO, CreateShowInputDTO, DeleteTicketInputDTO, IShowDB } from "../../src/models/Show"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/data/ShowDatabaseMock"

describe("Testando a ShowRules para casos de sucesso", () => {
    const showRules = new ShowRules(
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

        const response = await showRules.createShowTest(input)

        expect(response.message).toBe("Show agendado com suceso!")
    })


    test("testando o método de pegar todos os shows", async()=>{
        const response = await showRules.getShows()

        const shows: IShowDB[] = [
            {
                id: "201",
                band: "Foo Fighters",
                starts_at: "05/12/2023"
            },
            {
                id: "202",
                band: "System of a Down",
                starts_at: "06/12/2023"
            },
            {
                id: "203",
                band: "Evanescence",
                starts_at: "07/12/2023"
            }
        ]

        const responseToDBModel = ShowDatabaseMock.toShowDBModel(response[0])
        expect(responseToDBModel).toEqual(shows[0])
    })

    test("testando o método de comprar ingresso", async()=>{
        const input ={
            test: true,
            show_id: "201",
            user_id: "0009",
            token: "token-mock-normal"
        }

        const response = await showRules.buyTicketTest(input)

        expect(response.message).toBe("Ingresso reservado com sucesso!")
    })

    test("testando o mótodo de cancelar a reseserva de um ingresso",async()=>{
        const input ={
            test:true,
            show_id: "201",
            token: "token-mock-normal"
        }
        
        const response = await showRules.deleteTicketTest(input)

        expect(response.message).toBe("Ingresso restituído")
    })

})
