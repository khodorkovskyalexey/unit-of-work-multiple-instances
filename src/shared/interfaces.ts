export interface IUnitOfWork {
  execute(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}

export interface IBaseRepository<Entity extends IBaseEntity> {
  printTrx(): void;
  find(): Promise<Entity[]>;
  save(cat: Omit<IBaseEntity, 'id'>): Promise<Entity>;
};

export interface IBaseEntity {
  id: number;
  name: string;
}