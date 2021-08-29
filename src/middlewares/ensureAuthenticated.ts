import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import UsersRepository from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userID } = verify(token, "rentalx") as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findByID(userID);

    if (!user) throw new AppError("User does not exists!", 401);

    request.user = {
      id: userID,
    };

    next();
  } catch (error) {
    throw new AppError("invalid token!", 401);
  }
}
