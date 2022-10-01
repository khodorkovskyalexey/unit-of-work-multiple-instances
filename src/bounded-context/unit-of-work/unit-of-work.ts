import { ITransaction, ITransactionOrchestrator, IUnitOfWork } from '../../shared/interfaces';
import { ICatRepository, IDogRepository } from "../interfaces";

export type IUnitOfWorkRepositories<T extends ITransaction = any> = {
  CatRepositoryConstructor: (trx: T) => ICatRepository,
  DogRepositoryConstructor: (trx: T) => IDogRepository,
};

export class UnitOfWork implements IUnitOfWork {
  private readonly repositories: {
    catRepository?: ICatRepository,
    dogRepository?: IDogRepository
  };

  constructor(private readonly orchestrator: ITransactionOrchestrator, private readonly constructors: IUnitOfWorkRepositories) {
    this.repositories = {};
  }

  get catRepository() {
    if (!this.repositories.catRepository) {
      this.repositories.catRepository = this.constructors.CatRepositoryConstructor(this.orchestrator.trx);
    }

    return this.repositories.catRepository;
  }

  get dogRepository() {
    if (!this.repositories.dogRepository) {
      this.repositories.dogRepository = this.constructors.DogRepositoryConstructor(this.orchestrator.trx);
    }

    return this.repositories.dogRepository;
  }

  async execute(): Promise<void> {
    try {
      await this.commit();
    } catch (e) {
      await this.rollback();
      throw e;
    }
  }

  async commit() {
    await this.orchestrator.commit();
  }

  async rollback() {
    await this.orchestrator.rollback();
  }
}