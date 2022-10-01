import { QueryRunner, EntityManager } from 'typeorm';
import { ICatEntity, ICatRepository } from "src/bounded-context/interfaces";
import { connection } from "../../../shared/database/typeorm.config";
import { CatTypeormEntity } from '../entities/cat-typeorm.entity';

export class CatTypeormRepository implements ICatRepository {
  private _manager: EntityManager;

  static create(queryRunner: QueryRunner): CatTypeormRepository {
    const repo = new CatTypeormRepository();
    repo._manager = queryRunner.manager;

    return repo;
  }

  printTrx(): void {
    console.log(this._manager);
  }

  async find(): Promise<ICatEntity[]> {
    const manager = this._manager ?? (await connection).createQueryRunner().manager;

    return manager.find(CatTypeormEntity);
  }

  async save(cat: Omit<CatTypeormEntity, "id">): Promise<ICatEntity> {
    const manager = this._manager ?? (await connection).createQueryRunner().manager;

    return manager.save(manager.create(CatTypeormEntity, cat));
  }
}
