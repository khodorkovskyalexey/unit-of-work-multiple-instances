import { Transaction } from "objection";
import { QueryRunner } from 'typeorm';

export interface IUnitOfWork {
  execute(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export interface IBaseRepository<Entity extends IBaseEntity> {
  printTrx(): void;
  find(): Promise<IBaseEntity[]>;
  save(cat: Omit<Entity, 'id'>): Promise<IBaseEntity>;
};

export interface IBaseEntity {
  id: number;
  name: string;
}

export type ITransaction = Transaction | QueryRunner;

export interface ITransactionOrchestrator {
  trx: ITransaction;
  startTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}