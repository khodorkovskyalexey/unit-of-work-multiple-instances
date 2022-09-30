import { Transaction } from "objection";
import { ICatRepository, IDogRepository } from "../repositories/interfaces";
import { IUnitOfWork } from '../../shared/interfaces';

export type IUnitOfWorkRepositories = {
  CatRepositoryConstructor: (trx: Transaction) => ICatRepository,
  DogRepositoryConstructor: (trx: Transaction) => IDogRepository,
};

export class UnitOfWork implements IUnitOfWork {
  private readonly repositories: {
    catRepository?: ICatRepository,
    dogRepository?: IDogRepository
  };

  constructor(private readonly trx: Transaction, private readonly constructors: IUnitOfWorkRepositories) {
    this.repositories = {};
  }

  get catRepository() {
    if (!this.repositories.catRepository) {
      this.repositories.catRepository = this.constructors.CatRepositoryConstructor(this.trx);
    }

    return this.repositories.catRepository;
  }

  get dogRepository() {
    if (!this.repositories.dogRepository) {
      this.repositories.dogRepository = this.constructors.DogRepositoryConstructor(this.trx);
    }

    return this.repositories.dogRepository;
  }

  async execute() {
    try {
      await this.commit();
    } catch (e) {
      await this.rollback();
      throw e;
    }
  }

  async commit() {
    await this.trx.commit();
    await this.trx.executionPromise;
  }

  async rollback() {
    await this.trx.rollback();
  }
}