import FakeCarsRepository from "@modules/cars/repositories/fakeRepositories/FakeCarsRepository";

import ListAvailableCarsService from "./ListAvailableCarsService";

let listCarsService: ListAvailableCarsService;
let fakeCarsRepository: FakeCarsRepository;

describe("List Cars", () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listCarsService = new ListAvailableCarsService(fakeCarsRepository);
  });

  it("should be able to list all available cars", async () => {
    await fakeCarsRepository.create({
      name: "BMW C150",
      licensePlate: "AUYD-1578",
      brand: "BMW",
      fineAmount: 100,
      categoryId: "category-BMW",
      dailyRate: 150,
      description: "Um excelente carro de luxo",
    });

    await fakeCarsRepository.create({
      name: "BMW C250",
      licensePlate: "AUYD-1898",
      brand: "BMW",
      fineAmount: 100,
      categoryId: "category-BMW",
      dailyRate: 250,
      description: "Um excelente carro de luxo padrão superior",
    });

    await fakeCarsRepository.create({
      name: "GOL G8",
      licensePlate: "AUYD-1578",
      brand: "Wolkswagen",
      fineAmount: 100,
      categoryId: "utilitários",
      dailyRate: 30,
      description: "Carro popular barato",
    });

    await fakeCarsRepository.create({
      name: "GOL G7",
      licensePlate: "AUYD-2478",
      brand: "Wolkswagen",
      fineAmount: 100,
      categoryId: "utilitários",
      dailyRate: 10,
      description: "Carro popular barato",
    });
    const availableCars = await listCarsService.execute({});

    expect(availableCars).toHaveLength(4);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await fakeCarsRepository.create({
      name: "BMW C250",
      licensePlate: "AUYD-1898",
      brand: "BMW",
      fineAmount: 100,
      categoryId: "category-BMW",
      dailyRate: 250,
      description: "Um excelente carro de luxo padrão superior",
    });

    const car2 = await fakeCarsRepository.create({
      name: "BMW C150",
      licensePlate: "AUYD-1578",
      brand: "BMW",
      fineAmount: 100,
      categoryId: "category-BMW",
      dailyRate: 150,
      description: "Um excelente carro de luxo",
    });

    await fakeCarsRepository.create({
      name: "GOL G8",
      licensePlate: "AUYD-1578",
      brand: "Wolkswagen",
      fineAmount: 100,
      categoryId: "utilitários",
      dailyRate: 30,
      description: "Carro popular barato",
    });

    await fakeCarsRepository.create({
      name: "GOL G7",
      licensePlate: "AUYD-2478",
      brand: "Wolkswagen",
      fineAmount: 100,
      categoryId: "utilitários",
      dailyRate: 10,
      description: "Carro popular barato",
    });
    const availableCars = await listCarsService.execute({
      brand: "BMW",
    });

    expect(availableCars).toHaveLength(2);
    expect(availableCars).toEqual([car, car2]);
  });

  it("Should be able to list all available cars by car name", async () => {
    await fakeCarsRepository.create({
      name: "BMW C250",
      licensePlate: "AUYD-1898",
      brand: "BMW",
      fineAmount: 100,
      categoryId: "category-BMW",
      dailyRate: 250,
      description: "Um excelente carro de luxo padrão superior",
    });

    await fakeCarsRepository.create({
      name: "BMW C150",
      licensePlate: "AUYD-1578",
      brand: "BMW",
      fineAmount: 100,
      categoryId: "category-BMW",
      dailyRate: 150,
      description: "Um excelente carro de luxo",
    });

    const car = await fakeCarsRepository.create({
      name: "GOL G8",
      licensePlate: "AUYD-1578",
      brand: "Wolkswagen",
      fineAmount: 100,
      categoryId: "utilitários",
      dailyRate: 30,
      description: "Carro popular barato",
    });

    await fakeCarsRepository.create({
      name: "GOL G7",
      licensePlate: "AUYD-2478",
      brand: "Wolkswagen",
      fineAmount: 100,
      categoryId: "utilitários",
      dailyRate: 10,
      description: "Carro popular barato",
    });
    const availableCars = await listCarsService.execute({
      carName: "GOL G8",
    });

    expect(availableCars).toHaveLength(1);
    expect(availableCars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    await fakeCarsRepository.create({
      name: "BMW C250",
      licensePlate: "AUYD-1898",
      brand: "BMW",
      fineAmount: 100,
      categoryId: "category-BMW",
      dailyRate: 250,
      description: "Um excelente carro de luxo padrão superior",
    });

    await fakeCarsRepository.create({
      name: "BMW C150",
      licensePlate: "AUYD-1578",
      brand: "BMW",
      fineAmount: 100,
      categoryId: "category-BMW",
      dailyRate: 150,
      description: "Um excelente carro de luxo",
    });

    const car = await fakeCarsRepository.create({
      name: "GOL G8",
      licensePlate: "AUYD-1578",
      brand: "Wolkswagen",
      fineAmount: 100,
      categoryId: "utilitários",
      dailyRate: 30,
      description: "Carro popular barato",
    });

    const car2 = await fakeCarsRepository.create({
      name: "GOL G7",
      licensePlate: "AUYD-2478",
      brand: "Wolkswagen",
      fineAmount: 100,
      categoryId: "utilitários",
      dailyRate: 10,
      description: "Carro popular barato",
    });
    const availableCars = await listCarsService.execute({
      categoryId: "utilitários",
    });

    expect(availableCars).toHaveLength(2);
    expect(availableCars).toEqual([car, car2]);
  });
});
