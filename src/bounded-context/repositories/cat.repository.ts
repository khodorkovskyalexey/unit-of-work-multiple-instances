import { Transaction } from "objection";
import { CatEntity } from "../entities/cat.entity";
import { IDogEntity } from "../entities/interfaces";
import { ICatRepository } from "./interfaces";

export class CatRepository implements ICatRepository {
  private _trx?: Transaction;

  static create(trx: Transaction) {
    const repo = new CatRepository();
    repo._trx = trx;

    return repo;
  }

  printTrx() {
    console.log(this._trx);
  }

  async find(): Promise<CatEntity[]> {
    return CatEntity.query(this._trx);
  }

  async save(cat: IDogEntity): Promise<CatEntity> {
    return CatEntity.query(this._trx).insert(cat);
  }
}