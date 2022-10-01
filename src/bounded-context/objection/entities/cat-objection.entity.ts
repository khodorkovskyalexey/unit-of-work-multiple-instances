import { Model } from 'objection';
import { ICatEntity } from 'src/bounded-context/interfaces';

export class CatObjectionEntity extends Model implements ICatEntity {
  static tableName = 'cats';

  id: number;
  name: string;
}
