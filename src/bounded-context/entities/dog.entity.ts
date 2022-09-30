import { Model } from 'objection';
import { IDogEntity } from './interfaces';

export class DogEntity extends Model implements IDogEntity {
  static tableName = 'dogs';

  id: number;
  name: string;
}
