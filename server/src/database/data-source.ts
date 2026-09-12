import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ENTITIES } from './entities.js';

// Standalone DataSource used only by the TypeORM CLI (migration:generate,
// migration:run, migration:revert — see package.json). The running Nest app
// does not import this file; it configures TypeOrmModule directly in
// app.module.ts, but points at the same entities and the same migrations
// folder so both stay in sync.
const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ENTITIES,
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;
