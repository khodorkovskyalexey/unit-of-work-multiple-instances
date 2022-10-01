import { ICatEntity } from 'src/bounded-context/interfaces';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const tableName = 'cats';

@Entity({ name: tableName })
export class CatTypeormEntity implements ICatEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;
}