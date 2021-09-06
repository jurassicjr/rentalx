import { Request, Response } from "express";
import { container } from "tsyringe";

import ListAvailableCarsService from "./ListAvailableCarsService";

export default class ListAvailableCarsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, categoryId } = request.query;

    const listAvailableCarsService = container.resolve(ListAvailableCarsService);

    const availableCars = await listAvailableCarsService.execute({
      brand: brand as string,
      categoryId: categoryId as string,
      carName: name as string,
    });

    return response.json(availableCars);
  }
}
