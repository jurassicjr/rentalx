import { Request, Response } from "express";
import { container } from "tsyringe";

import AddSpecificationToCarService from "./AddSpecificationToCarService";

export default class AddSpecificationToCarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specificationsId } = request.body;
    const addSpecificationToCarService = container.resolve(AddSpecificationToCarService);

    const car = await addSpecificationToCarService.execute({ carId: id, specificationsId });

    return response.json(car);
  }
}
