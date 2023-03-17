import { BaseError } from "../../src/errors/BaseError"
import { ShowRules } from "../../src/Rules/ShowRules"
import { ShowDataBaseMock } from "../mocks/data/ShowDataBaseMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"

describe("testando casos de erros do método deleteToicket em ShowRules", () => {
    const showRules = new ShowRules(
        new ShowDataBaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )

    test("testando erro para um dos campos vazio", async () => {
        expect.assertions(2)
        
        try {
            const input = {
                token: "token-mock-normal"
            }
            await showRules.deleteTicketTest(input)

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
                show_id: "301",
                token: "token"
            }
            await showRules.deleteTicketTest(input)

        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Credenciais inválidas")
                expect(error.statusCode).toBe(401)
            }
        }
    })

    test("testando erro para tentativa de deletar um ticket que não existe", async () => {
        expect.assertions(2)
        
        try {
            const input = {
                show_id: "id-ticket",
                token: "token-mock-normal"
            }
            await showRules.deleteTicketTest(input)

        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})