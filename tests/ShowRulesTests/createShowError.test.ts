import { BaseError } from "../../src/errors/BaseError"
import { ShowRules } from "../../src/Rules/ShowRules"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { ShowDatabaseMock } from "../mocks/data/ShowDatabaseMock"

describe("testando casos de erros do método createShow em ShowRules", () => {
    const showRules = new ShowRules(
        new ShowDatabaseMock(),
        new IdGeneratorMock(),
        new AuthenticatorMock()
    )


    test("testando erro para um dos campos vazio", async () => {
        expect.assertions(2)
        
        try {
            
            const input = {
                starts_at: "2022-01-01",
                token: "token"
            }
            await showRules.createShowTest(input)

        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("testando erro para data onde há uma letra no lugar de um número", async () => {
        expect.assertions(2)
        
        try {
            
            const input = {
                band: "band",
                starts_at: "202a-01-01",
                token: "token"
            }
            await showRules.createShowTest(input)

        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Data inválida")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("testando erro para data em formato inválido com menos de 4 dígitos", async () => {
        expect.assertions(2)
        
        try {
            
            const input = {
                band: "band",
                starts_at: "202-01-01",
                token: "token"
            }
            await showRules.createShowTest(input)

        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Data inválida")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("testando erro para tentativa de criar um show para antes do dia marcado para o evento", async () => {
        expect.assertions(2)
        
        try {
            
            const input = {
                band: "band",
                starts_at: "2023-11-04",
                token: "token"
            }
            await showRules.createShowTest(input)

        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Data inválida")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("testando erro para um token inválido", async () => {
        expect.assertions(2)
        
        try {
            
            const input = {
                band: "band",
                starts_at: "06/12/2022",
                token: "token"
            }
            await showRules.createShowTest(input)

        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Credenciais inválidas")
                expect(error.statusCode).toBe(401)
            }
        }
    })

    test("testando erro para um usuário que não é admin tentando acessar o endpoint de criar shows", async () => {
        expect.assertions(2)
        
        try {
            
            const input = {
                band: "band",
                starts_at: "06/12/2022",
                token: "token-mock-normal"
            }
            await showRules.createShowTest(input)

        } catch (error) {
            if(error instanceof BaseError){
                expect(error.message).toBe("Permissão insuficiente")
                expect(error.statusCode).toBe(403)
            }
        }
    })

    test("testando erro para tentativa de criar um show para uma data já reservada", async () => {
        expect.assertions(1)
        
        try {
            
            const input = {
                band: "band",
                starts_at: "05/12/2023",
                token: "token-mock-admin"
            }
            await showRules.createShowTest(input)

        } catch (error) {
            if(error instanceof Error){
                expect(error.message).toBe("Essa data já está reservada")
            }
        }
    })
})