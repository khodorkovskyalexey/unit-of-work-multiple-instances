import { CatEntity } from "../entities/cat.entity";
import { DogEntity } from "../entities/dog.entity";
import { IBaseRepository } from "../../shared/interfaces";

export interface ICatRepository extends IBaseRepository<CatEntity> {}

export interface IDogRepository extends IBaseRepository<DogEntity> {}