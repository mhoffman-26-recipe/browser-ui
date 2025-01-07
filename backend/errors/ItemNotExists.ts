import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

// TODO: support dynamic types of resurces (user, recipe, image) that not founded
export class ItemNotExists extends BaseError {
    constructor(id: number) {
        super(`Item with id: ${id} doesn't exists`, StatusCodes.NOT_FOUND, `Item with id: ${id} doesn't exists`);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ItemNotExists.prototype);
    }
}