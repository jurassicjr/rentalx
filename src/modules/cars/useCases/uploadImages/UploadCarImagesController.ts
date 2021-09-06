import { Request, Response } from "express";
import { container } from "tsyringe";

import UploadCarImagesService from "./UploadCarImagesService";

interface IFiles {
  filename: string;
}

export default class UploadCarImagesController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImagesService = container.resolve(UploadCarImagesService);

    const imagesName = images.map((file) => file.filename);

    uploadCarImagesService.execute({ carId: id, imagesName });

    return response.status(201).send();
  }
}
