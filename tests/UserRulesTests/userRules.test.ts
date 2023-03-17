import { UserDataBaseMock } from "../mocks/data/UserDataBaseMock"
import { UserRules } from "../../src/Rules/UserRules"
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock"
import { HashManagerMock } from "../mocks/services/HashManagerMock"
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock"

describe("testando casos de sucesso para UserRules", () => {
    const userRules = new UserRules(
        new UserDataBaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new AuthenticatorMock()
        )
        
    test(
        "testando o método signup, deve obter sucesso, é retornado um objeto com 'token' e 'message'", async () => {
        expect.assertions(2)
    
        const input = {
            name: "user test",
            email: "test@gmail.com",
            password: "123456"
        }
    
        const response = await userRules.signupTest(input)
        expect(response.message).toBe("Cadastro realizado com sucesso!")
        expect(response.token).toBe("token-mock-normal")
    })


    test("testando o método de login", async () => {
        expect.assertions(2)

        const input = {
            email: "astrodev@gmail.com",
            password: "bananinha"
        }

        const response = await userRules.loginTest(input)
        expect(response.message).toBe("Login realizado com sucesso!")
        expect(response.token).toBe("token-mock-admin")
    })

})