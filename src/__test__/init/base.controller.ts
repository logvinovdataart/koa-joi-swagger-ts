import {controller, get, parameter, summary, response, description, HTTPStatusCodes} from "../..";
import * as joi from "joi";

class VersionQueryParam {
    public version = joi.string().description("version");
}

@controller("/v3/api")
export class BaseController {

    @get("/")
    @parameter({$ref: VersionQueryParam})
    @summary("BaseController[index]")
    @response(HTTPStatusCodes.success)
    @description("home")
    public index(): void {

    }

}
