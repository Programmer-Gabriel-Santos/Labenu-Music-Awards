import { BaseError } from "../../src/errors/BaseError"
import { ShowRules } from "../../src/Rules/ShowRules"
import { ShowDataBaseMock } from "../mocks/data/ShowDataBaseMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"

describe("testando casos de erros do método buyTicket em ShowRules", () => {
    const showRules = new ShowRules(
        new ShowDataBaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("testando erro para um dos campos vazio", async () => {
        expect.assertions(2)
        
        try {
            const input = {
                user_id: "user_id",
                token: "token-mock-normal"
            }
            await showRules.buyTicketTest(input)

        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("testando erro para um token inválido", async () => {
        expect.assertions(2)
        
        try {
            
            const input = {
                show_id: "309",
                user_id: "201",
                token: "token"
            }
            await showRules.buyTicketTest(input)

        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Credenciais inválidas")
                expect(error.statusCode).toBe(401)
            }
        }
    })


    test("testando erro para um usuário que já possui um ingresso e tenta comprar outro", async () => {
        expect.assertions(1)
        
        try {
            
            const input = {
                test: true,
                show_id: "201",
                user_id: "id-mock",
                token: "token-mock-normal"
            }
            await showRules.buyTicketTest(input)

        } catch (error) {
            if(error instanceof Error){
                expect(error.message).toBe("Você já possui um ingresso")
            }
        }
    })


    test("testando erro se os ingressos tiverem esgotado", async () => {
        expect.assertions(1)
        
        try {
            
            const input = {
                show_id: "201",
                user_id: "id",
                token: "token-mock-normal"
            }
            await showRules.buyTicketTest(input)

        } catch (error) {
            if(error instanceof Error){
                expect(error.message).toBe("Ingressos esgotados :/")
            }
        }
    })
})