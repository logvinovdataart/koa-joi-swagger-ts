import * as joi from "joi";

export class UserBodyRequestSchema {
    public user = joi.string().description("user");
}
