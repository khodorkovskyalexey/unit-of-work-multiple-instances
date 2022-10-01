import { initObjectionClient } from "./shared/database/objection-client.factory";
import { BoundedContextUnitOfWorkFactory as UnitOfWorkFactory } from "./bounded-context";
import { CatObjectionRepository } from "./bounded-context/objection/repositories/cat-objection.repository";
import { CatTypeormRepository } from "./bounded-context/typeorm/repositories/cat-typeorm.repository";
import { UnitOfWorkORM } from "./bounded-context/unit-of-work/unit-of-work.factory";

initObjectionClient();

async function main() {
  // look at the example of this unnamed bounded context

  // first trx
  const unitOfWork1 = await UnitOfWorkFactory.start(UnitOfWorkORM.TYPEORM);

  await unitOfWork1.catRepository.save({ name: 'Cat 1' });
  await unitOfWork1.catRepository.save({ name: 'Cat 2' });
  await unitOfWork1.dogRepository.save({ name: 'Dog 1' });
  await unitOfWork1.dogRepository.find();
  
  unitOfWork1.dogRepository.printTrx(); // !== undefined

  await unitOfWork1.execute();

  // -------------------------------------------------------

  // second trx
  const unitOfWork2 = await UnitOfWorkFactory.start(UnitOfWorkORM.OBJECTION);

  await unitOfWork2.catRepository.save({ name: 'Cat 3' });
  await unitOfWork2.catRepository.save({ name: 'Cat 4' });
  await unitOfWork2.dogRepository.save({ name: 'Dog 2' });
  await unitOfWork2.dogRepository.find();
  
  unitOfWork2.dogRepository.printTrx(); // !== undefined

  await unitOfWork2.execute();

  // -------------------------------------------------------

  // will be fail
  // you can't use instance UnitOfWork after execute/commit/rollback
  try {
    await unitOfWork1.catRepository.find();
  } catch (error) {
    console.error((error as Error).message); // === 'Transaction query already complete, run with DEBUG=knex:tx for more info'
  }

  // -------------------------------------------------------

  // if you need to use repository without transaction, you can do
  // or inject repository in Nest.js (read README.md)
  const catRepository = new CatObjectionRepository();
  await catRepository.save({ name: 'Cat 5 without transaction' });
  await catRepository.find();

  catRepository.printTrx(); // === undefined

  // or with TypeORM
  const catTypeormRepository = new CatTypeormRepository();
  await catTypeormRepository.save({ name: 'Typeorm cat' });
  await catTypeormRepository.find();

  catRepository.printTrx(); // === undefined
}

main();