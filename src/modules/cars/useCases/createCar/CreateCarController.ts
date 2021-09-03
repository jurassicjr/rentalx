import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCarService from "./CreateCarService";

export default class CreateCarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, dailyRate, fineAmount, brand, licensePlate, categoryId } = request.body;

    const createCarService = container.resolve(CreateCarService);
    const car = await createCarService.execute({
      name,
      description,
      dailyRate,
      fineAmount,
      brand,
      licensePlate,
      categoryId,
    });

    return response.status(201).json(car);
  }
}
