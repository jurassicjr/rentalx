import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUserService from "./AuthenticateUserService";

export default class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticate = container.resolve(AuthenticateUserService);

    const authenticationToken = await authenticate.execute({ email, password });

    return response.json(authenticationToken);
  }
}
