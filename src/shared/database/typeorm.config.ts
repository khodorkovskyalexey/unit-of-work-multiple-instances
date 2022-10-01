import { Connection, createConnection } from 'typeorm';
import { CatTypeormEntity } from '../../bounded-context/typeorm/entities/cat-typeorm.entity';
import { DogTypeormEntity } from '../../bounded-context/typeorm/entities/dog-typeorm.entity';

export const connection: Promise<Connection> = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'root',
  database: 'root',
  username: 'root',
  entities: [CatTypeormEntity, DogTypeormEntity],
  synchronize: false,
  logging: true,
});




