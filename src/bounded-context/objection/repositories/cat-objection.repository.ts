import { Model, Transaction } from "objection";
import { ICatEntity, ICatRepository } from "src/bounded-context/interfaces";
import { CatObjectionEntity } from "../entities/cat-objection.entity";

export class CatObjectionRepository implements ICatRepository {
  private _trx?: Transaction;

  static create(trx: Transaction) {
    const repo = new CatObjectionRepository();
    repo._trx = trx;

    return repo;
  }

  printTrx() {
    console.log(this._trx);
  }

  async find(): Promise<ICatEntity[]> {
    return CatObjectionEntity.query(this._trx);
  }

  async save(cat: Omit<ICatEntity, 'id' | keyof Model>): Promise<CatObjectionEntity> {    
    return CatObjectionEntity.query(this._trx).insert(cat);
  }
}