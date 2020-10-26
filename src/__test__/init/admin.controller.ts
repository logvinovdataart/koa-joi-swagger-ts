import {controller, del, parameter, ENUM_PARAM_IN} from "../..";
import * as joi from "joi";
import {UserController} from "./user.controller";

class AdminIdParam {
   public adminId = joi.string().required().description("admin id")
}

@controller("/admin")
export class AdminController extends UserController {

    @del("/{adminId}")
    @parameter({ $ref: AdminIdParam}, ENUM_PARAM_IN.path)
    public doDelete(): void {

    }

}
