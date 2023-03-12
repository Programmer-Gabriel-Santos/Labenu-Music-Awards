import { IUserDB, User } from "../models/User"
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "Lama_users"

    toUserDBModel = (user: User) => {
        const userDB: IUserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole()
        }

        return userDB
    }

    findByEmail = async (email: string): Promise<IUserDB> => {

        const userDB: IUserDB[] = await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .select()
            .where({ email })

        return userDB[0]
    }

    insertUser = async (user: User) => {
        const userDB = this.toUserDBModel(user)

        await UserDatabase.connection(UserDatabase.TABLE_USERS)
            .insert(userDB)
    }
}