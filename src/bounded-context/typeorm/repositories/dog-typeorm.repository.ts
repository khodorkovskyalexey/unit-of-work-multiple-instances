import { EntityManager, QueryRunner } from 'typeorm';
import { IDogEntity, IDogRepository } from "src/bounded-context/interfaces";
import { connection } from "../../../shared/database/typeorm.config";
import { DogTypeormEntity } from '../entities/dog-typeorm.entity';

export class DogTypeormRepository implements IDogRepository {
  private _manager: EntityManager;

  static create(queryRunner: QueryRunner): DogTypeormRepository {
    const repo = new DogTypeormRepository();
    repo._manager = queryRunner.manager;

    return repo;
  }

  printTrx(): void {
    console.log(this._manager);
  }

  async find(): Promise<IDogEntity[]> {
    const manager = this._manager ?? (await connection).createQueryRunner().manager;

    return manager.find(DogTypeormEntity);
  }

  async save(dog: Omit<DogTypeormEntity, "id">): Promise<IDogEntity> {
    const manager = this._manager ?? (await connection).createQueryRunner().manager;

    return manager.save(manager.create(DogTypeormEntity, dog));
  }
}
