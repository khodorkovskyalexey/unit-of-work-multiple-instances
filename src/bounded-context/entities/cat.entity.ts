import { Model } from 'objection';
import { ICatEntity } from './interfaces';

export class CatEntity extends Model implements ICatEntity {
  static tableName = 'cats';

  id: number;
  name: string;
}
