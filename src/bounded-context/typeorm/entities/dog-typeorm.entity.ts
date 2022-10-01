import { IDogEntity } from 'src/bounded-context/interfaces';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const tableName = 'dogs';

@Entity({ name: tableName })
export class DogTypeormEntity implements IDogEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;
}