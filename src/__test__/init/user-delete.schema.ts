import * as joi from "joi";

export class UserDeleteRequestSchema {
    public uid = joi.string().required().description("userID");
}
