import {BaseDataBase} from "../BaseDataBase"

export class Migrations extends BaseDataBase{

    user = {
        idUser: "001",
        name: "Astrodev",
        email: "astrodev@labenu.com",
        password: "123456"
    }
    
    private connection = this.getConnection()

    createTables = async (): Promise<void> =>{
        
        const usersTableExists = await this.connection.schema.hasTable("Lama_users")

        if(usersTableExists) console.log("Tabelas e Usuário Admin já existentes,", "esse é seu usuário:", "\n", this.user)
        
        if(!usersTableExists){
            console.log("Criando tabela de usuários...")

            await this.connection.schema.createTable("Lama_users", (table) => {
                table.string("id", 100).primary();
                table.string("name", 50).notNullable();
                table.string("email", 100).notNullable().unique();
                table.string("password", 100).notNullable();
                table.enum("role", ["NORMAL", "ADMIN"]).defaultTo("NORMAL");
            });
            console.log("Criando tabela de shows...")
            
                await this.connection.schema.createTable("Lama_shows", (table) => {
                table.string("id", 100).primary();
                table.string("band", 50).notNullable();
                table.date('starts_at').notNullable();
            });
            console.log("Criando tabela de tickets...")

            await this.connection.schema.createTable("Lama_tickets", (table) => {
                table.string("id", 100).primary();
                table.string("show_id", 100).references("id").inTable("Lama_shows");
                table.string("user_id", 100).references("id").inTable("Lama_users");
            });
            console.log("Tabelas criadas")

            console.log("Inserindo dados de usuário Admin...")

            await this.connection("Lama_users").insert ({
               id: "001",
               name: "Astrodev",
               email: "astrodev@labenu.com",
               password: "$2a$10$a7peD6Q2bZG3U0oAOlEnduu0pMxbw6E/ljrNGZMHewPpwgBQ/aSte",
               role: "ADMIN"
            });

            console.log("Usuário criado com sucesso! Esse é seu login de para usar as funcionalidades da aplicação:",
             "\n", this.user
            )
        }   
    }  
}
// const migrations = new Migrations()

// migrations.createTables()