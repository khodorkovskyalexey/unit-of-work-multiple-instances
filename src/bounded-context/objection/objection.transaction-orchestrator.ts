import { Model, Transaction } from "objection";
import { ITransactionOrchestrator } from "src/shared/interfaces";

export class ObjectionTransactionOrchestrator implements ITransactionOrchestrator {
  private transaction: Transaction;

  public get trx(): Transaction {
    return this.transaction;
  }

  async startTransaction(): Promise<void> {
    this.transaction = await Model.startTransaction();
  }

  async commit(): Promise<void> {
    await this.transaction.commit();
    await this.transaction.executionPromise;
  }

  async rollback(): Promise<void> {
    await this.transaction.rollback();
  }
}