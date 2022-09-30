import { Transaction } from "objection";
import { IDogEntity } from "../entities/interfaces";
import { DogEntity } from "../entities/dog.entity";
import { IDogRepository } from "./interfaces";

export class DogRepository implements IDogRepository {
  private _trx?: Transaction;

  static create(trx: Transaction) {
    const repo = new DogRepository();
    repo._trx = trx;

    return repo;
  }

  printTrx() {
    console.log(this._trx);
  }

  async find() {
    return DogEntity.query(this._trx);
  }

  async save(dog: IDogEntity) {
    return DogEntity.query(this._trx).insert(dog);
  }
}