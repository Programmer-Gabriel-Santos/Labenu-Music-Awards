import { BaseDatabase } from "../../../src/database/BaseDatabase"
import { IUserDB, User } from "../../../src/models/User"
import { users} from "./data"

export class UserDataBaseMock extends BaseDatabase {
    public static TABLE_USERS = "Lama_users"

    toUserDBModel = (user: any) => {
        const userDB: IUserDB = {
            id: "001",
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role
        }

        return userDB
    }

    findByEmail = async (email: string): Promise<IUserDB> => {

        const user: IUserDB | any = users.find(user => user.email === email) 

        if(user) {
            return this.toUserDBModel(user)
        }

        return user as IUserDB
    }

    insertUser = async (user: User) => { }
}