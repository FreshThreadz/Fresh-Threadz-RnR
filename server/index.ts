import express, {Express} from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import {pool} from '../db/postgres';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());


app.get('/loaderio-0d0fb64c2e0ecb546a86c4b029ddf30d',
  (req, res) => res.send('loaderio-0d0fb64c2e0ecb546a86c4b029ddf30d'))

app.use('/reviews', router);

pool.connect()

pool.query('SELECT * FROM reviews WHERE id = 1 limit 1', (err, res) => {
  if (err) {console.log('psql db connection err')}
  else {console.log('psql db connected')}
})

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
