import { Model } from "objection";
import { CatRepository } from "../repositories/cat.repository";
import { DogRepository } from "../repositories/dogs.repository";
import { IUnitOfWorkRepositories, UnitOfWork } from "./unit-of-work";

export class UnitOfWorkFactory {
  private static readonly catRepository = CatRepository;
  private static readonly dogRepository = DogRepository;

  static async start() {
    const trx = await Model.startTransaction();
    const repositories: IUnitOfWorkRepositories = {
      CatRepositoryConstructor: this.catRepository.create,
      DogRepositoryConstructor: this.dogRepository.create,
    };
    return new UnitOfWork(trx, repositories);
  }
}