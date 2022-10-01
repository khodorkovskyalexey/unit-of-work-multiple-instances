import { Transaction } from "objection";
import { QueryRunner } from "typeorm";
import { ITransactionOrchestrator } from "src/shared/interfaces";
import { ObjectionTransactionOrchestrator } from "../objection/objection.transaction-orchestrator";
import { CatObjectionRepository } from "../objection/repositories/cat-objection.repository";
import { DogObjectionRepository } from "../objection/repositories/dog-objection.repository";
import { CatTypeormRepository } from "../typeorm/repositories/cat-typeorm.repository";
import { DogTypeormRepository } from "../typeorm/repositories/dog-typeorm.repository";
import { TypeormTransactionOrchestrator } from "../typeorm/typeorm.transaction-orchestrator";
import { IUnitOfWorkRepositories, UnitOfWork } from "./unit-of-work";

export enum UnitOfWorkORM {
  TYPEORM = 'TYPEORM',
  OBJECTION = 'OBJECTION',
}

export class UnitOfWorkFactory {
  static async start(orm: UnitOfWorkORM) {
    const { orchestrator, repositories } = this.orchestratorAndRepositoriesMapper(orm);

    await orchestrator.startTransaction();

    return new UnitOfWork(orchestrator,  repositories);
  }

  private static orchestratorAndRepositoriesMapper(orm: UnitOfWorkORM): {
    orchestrator: ITransactionOrchestrator,
    repositories: IUnitOfWorkRepositories,
  } {
    // conditions
    // you can take orm from .env (not from argument)
    // or you can set conditions on other grounds
    // for example set conditions depending on orm from argument
    if (orm === UnitOfWorkORM.OBJECTION) {
      const orchestrator = new ObjectionTransactionOrchestrator();
      const repositories: IUnitOfWorkRepositories<Transaction> = {
        CatRepositoryConstructor: CatObjectionRepository.create,
        DogRepositoryConstructor: DogObjectionRepository.create,
      };

      return { orchestrator, repositories };
    }

    if (orm === UnitOfWorkORM.TYPEORM) {
      const orchestrator = new TypeormTransactionOrchestrator();
      const repositories: IUnitOfWorkRepositories<QueryRunner> = {
        CatRepositoryConstructor: CatTypeormRepository.create,
        DogRepositoryConstructor: DogTypeormRepository.create,
      };

      return { orchestrator, repositories };
    }

    throw new Error('Unsupported ORM type');
  }
}