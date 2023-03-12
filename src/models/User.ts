export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface IUserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES
}

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES
    ) {}

    static toUserModel = (user: any) => {
        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role
        )
    }

    public getId = () => {
        return this.id
    }

    public getName = () => {
        return this.name
    }

    public getEmail = () => {
        return this.email
    }

    public getPassword = () => {
        return this.password
    }

    public getRole = () => {
        return this.role
    }

    public setName = (newName: string) => {
        this.name = newName
    }

    public setEmail = (newEmail: string) => {
        this.email = newEmail
    }

    public setPassword = (newPassword: string) => {
        this.password = newPassword
    }
}

export interface SignupInputDTO {
    name: string,
    email: string,
    password: string
}

export interface SignupOutputDTO {
    message: string,
    token: string
}

export interface LoginInputDTO{
    email: string,
    password: string
}

export interface LoginOutputDTO {
    message: string,
    token: string
}