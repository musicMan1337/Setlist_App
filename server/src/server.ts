import knex from 'knex';

import app from './app';
import logger from './libs/logger';
import { PORT, DATABASE_URL } from './config';

const db = knex({
  client: 'pg',
  connection: DATABASE_URL
})
app.set('db', db)

app.listen(PORT, () => {
  logger.http(`Server listening at http://localhost:${PORT}/setapp/v1`);
});
