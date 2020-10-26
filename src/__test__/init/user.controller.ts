import {controller, del, get, post, put, ENUM_PARAM_IN, parameter, response, description, HTTPStatusCodes, summary, tag} from "../..";
import * as joi from "joi";
import {UserSchema} from "./user.schema";
import {BaseController} from "./base.controller";
import {UserBodyRequestSchema} from "./user-create.schema";
import {UserDeleteRequestSchema} from "./user-delete.schema";
import {UserUpdateRequestSchema} from "./user-update-schema";

class UserNameQueryParam {
    public userName = joi.string().description("username");
}

@controller("/user")
export class UserController extends BaseController {
    @get("/")
    @parameter({$ref: UserNameQueryParam})
    @response(HTTPStatusCodes.success, {$ref: UserSchema})
    @response(HTTPStatusCodes.created)
    @tag("User")
    public doGet(): void {

    }

    @post("/")
    @parameter({$ref: UserBodyRequestSchema})
    @summary("UserController[doPost]")
    @response(HTTPStatusCodes.other)
    public doPost(): void {

    }

    @del("/{uid}")
    @parameter({$ref: UserDeleteRequestSchema})
    @description("Delete User")
    public doDelete(): void {

    }

    @put("/")
    @parameter({$ref: UserUpdateRequestSchema}, ENUM_PARAM_IN.header)
    public doPut(): void {

    }
}
