import * as joi from "joi";

export class UserUpdateRequestSchema {
    public token = joi.string().description("token");
}
