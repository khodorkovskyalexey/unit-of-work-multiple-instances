import { Model } from 'objection';
import { IDogEntity } from 'src/bounded-context/interfaces';

export class DogObjectionEntity extends Model implements IDogEntity {
  static tableName = 'dogs';

  id: number;
  name: string;
}
