import { ISchema, toJoi, toSwagger } from "./ischema";
import * as joi from "joi";
import { registerMethod, registerMiddleware } from "./utils";
import {HTTPStatusCodes, IPath, Tags} from "./index";
import { BaseContext } from "koa";

const RESPONSES: Map<Function, Map<string, Map<number, ISchema | joi.Schema>>> = new Map();

export const DEFAULT_RESPONSE: joi.Schema = joi.string().default("");

export const response = (code: number, schema?: ISchema | joi.Schema): MethodDecorator => (target: {}, key: string): void => {
  if (!schema) {
    schema = DEFAULT_RESPONSE;
  }
  if (!RESPONSES.has(target.constructor)) {
    RESPONSES.set(target.constructor, new Map());
  }
  if (!RESPONSES.get(target.constructor).has(key)) {
    RESPONSES.get(target.constructor).set(key, new Map());
  }
  registerMethod(target, key, (router: IPath): void => {
    if (!router.responses) {
      router.responses = {};
    }
    schema = toSwagger(schema);
    let description = "";
    if (schema["description"]) {
      description = schema["description"];
      delete schema["description"];
    }
    router.responses[code] = Object.assign({description}, {schema});
  });

  registerMiddleware(target, key, async (ctx: BaseContext, next: Function): Promise<void> => {
    await next();
    if (RESPONSES.get(target.constructor).get(key).has(ctx.status)) {
      const registerJoiSchema = RESPONSES.get(target.constructor).get(key).get(ctx.status)["isJoi"]
          ? RESPONSES.get(target.constructor).get(key).get(ctx.status)
          // @ts-ignore
          : toJoi(RESPONSES.get(target.constructor).get(key).get(ctx.status));
      const {error, value} = registerJoiSchema.validate(ctx.body);
      if (error) {
        ctx.body = {code: HTTPStatusCodes.internalServerError, message: error.message};
        ctx.status = HTTPStatusCodes.internalServerError;
        return;
      }
      ctx.body = value;
    }
  });

  // @ts-ignore
  const joiSchema = schema["isJoi"] ? schema : toJoi(schema);
  RESPONSES.get(target.constructor).get(key).set(code, toJoi(joiSchema));
  target[Tags.tagResponse] = target.constructor[Tags.tagResponse] = RESPONSES.get(target.constructor);
};
