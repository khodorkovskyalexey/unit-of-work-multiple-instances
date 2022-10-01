import { QueryRunner } from 'typeorm';
import { ITransactionOrchestrator } from "src/shared/interfaces";
import { connection } from '../../shared/database/typeorm.config';

export class TypeormTransactionOrchestrator implements ITransactionOrchestrator {
  private queryRunner: QueryRunner;

  public get trx(): QueryRunner {
    return this.queryRunner;
  }

  async startTransaction(): Promise<void> {
    this.queryRunner = (await connection).createQueryRunner();
    await this.queryRunner.startTransaction();
  }

  async commit(): Promise<void> {
    await this.queryRunner.commitTransaction();
  }

  async rollback(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
  }
}