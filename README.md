# Unit of work implementation for node js

Using `Objection` + `knex`, `TypeORM` and `postgres`<br>

For load dependencies use:

For Objection.js:
```
yarn add knex objection pg
```
or
```
npm install knex objection pg
```

For TypeORM:
```
yarn add @nestjs/typeorm typeorm pg
```
or
```
npm install @nestjs/typeorm typeorm pg
```

---

You should write new class for each of your bounded context and in each UnitOfWork class use only required repositories.

In Nest.js you can make queries by `Model.query()` and use UnitOfWork from static `UnitOfWorkFactory.start()` in commands. So you don't have to use Repository from IoC Container and you don't have to use `@Injectable()` decorator in repositories. If you all the same use repositories in some commands, you can make Repository Injectable, make UnitOfWorkFactory Injectable and create new repository instance in factory.

In `src/index.ts` you can look at example of using UnitOfWork. It is example so itya can be there, but UnitOfWork belongs to bounded context and in your projects you should use UnitOfWork inside its bounded context only.