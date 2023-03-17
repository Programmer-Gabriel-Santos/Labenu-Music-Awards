import knex, { Knex } from "knex"
import dotenv from "dotenv"

dotenv.config()

export abstract class BaseDataBase {

    private connetion: Knex | null = null

    protected getConnection() {
        const DB_PORT = Number(process.env.DB_PORT)
        
        if (!this.connetion) {
            this.connetion = knex({
                client: "mysql2",
                connection: {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    database: process.env.DB_DATABASE,
                    password: process.env.DB_PASSWORD,
                    port: DB_PORT,
                }
            })
        }

        return this.connetion
    }
}
