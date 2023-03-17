import { BaseError } from "./BaseError";

export class InvalidData extends BaseError {
    constructor(
        message: string = "Data inválida" 
    ) {
        super(400, message)
    }
}