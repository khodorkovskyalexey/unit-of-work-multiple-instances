import { IBaseEntity, IBaseRepository } from "../shared/interfaces";

export interface ICatEntity extends IBaseEntity {}
export interface IDogEntity extends IBaseEntity {}

export interface ICatRepository extends IBaseRepository<ICatEntity> {}
export interface IDogRepository extends IBaseRepository<IDogEntity> {}