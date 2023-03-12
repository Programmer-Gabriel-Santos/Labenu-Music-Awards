import { BaseError } from "./BaseError";

export class EmailInvalid extends BaseError {
    constructor(
        message: string = "Email não atende aos requisitos de um email válido." 
    ) {
        super(422, message)
    }
}