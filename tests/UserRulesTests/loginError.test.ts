import { BaseError } from "../../src/errors/BaseError"
import { UserRules } from "../../src/Rules/UserRules"
import { UserDataBaseMock } from "../mocks/data/UserDataBaseMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"

describe("testando a classe UserRules com o método login", () => {
    const userRules = new UserRules(
        new UserDataBaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
    )

    test("testando erro para algum campo faltando", async () => {
        expect.assertions(2)
            
        try {
            const input = {
                email: "test@gmail.com",
            }
            await userRules.loginTest(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toBe("Parâmetros inválidos ou faltando")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("testando erro para o typeof de: email ser direfente de 'string', ou length < 12", async () => {
        expect.assertions(2)

        try {
            const input = {
                email: "test@gmail",
                password: "123456"
            }
            await userRules.loginTest(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toBe("Email não atende aos requisitos de um email válido.")
                expect(error.statusCode).toBe(422)
            }
        }
    })

    test("testando erro para validação de email, se posui os caracteres de um email válido", async () => {
        expect.assertions(2)

       try {
        const input = {
            email: "testeDeEmail.com",
            password: "123456"
        }
        await userRules.loginTest(input)

       } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toBe("Email não atende aos requisitos de um email válido.")
                expect(error.statusCode).toBe(422)
            }
       }
    })

    test("testando erro para typeof de 'password' !== 'string' ou length < 6", async () => {
        expect.assertions(2)

       try {
        const input = {
            name: "testtt",
            email: "teste@gmail.com",
            password: '12345'
        }
        await userRules.loginTest(input)

       } catch (error) {
            if(error instanceof BaseError) {
                expect(error.message).toBe("Credenciais inválidas")
                expect(error.statusCode).toBe(401)
            }
       }
    })

    test("testando erro para um usuário não cadastrado", async () => {
        expect.assertions(2)

        try {
            const input = {
                email: "teste@gmail.com",
                password: "123456"
            }
            await userRules.loginTest(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toBe("Credenciais inválidas")
                expect(error.statusCode).toBe(401)
            }
        }
    })

    test("testando erro para um usuário cadastrado, mas com senha inválida", async () => {
        expect.assertions(2)

        try {
            const input = {
                email: "astrodev@gmail.com",
                password: "1234567"
            }
            await userRules.loginTest(input)

        } catch (error) {
            if (error instanceof BaseError) {
                expect(error.message).toBe("Credenciais inválidas")
                expect(error.statusCode).toBe(401)
            }
        }
    })

})