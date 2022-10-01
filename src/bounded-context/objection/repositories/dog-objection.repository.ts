import { Model, Transaction } from "objection";
import { IDogEntity, IDogRepository } from "src/bounded-context/interfaces";
import { DogObjectionEntity } from "../entities/dog-objection.entity";

export class DogObjectionRepository implements IDogRepository {
  private _trx?: Transaction;

  static create(trx: Transaction) {
    const repo = new DogObjectionRepository();
    repo._trx = trx;

    return repo;
  }

  printTrx() {
    console.log(this._trx);
  }

  async find(): Promise<IDogEntity[]> {
    return DogObjectionEntity.query(this._trx);
  }

  async save(dog: Omit<IDogEntity, 'id' | keyof Model>) {
    return DogObjectionEntity.query(this._trx).insert(dog);
  }
}