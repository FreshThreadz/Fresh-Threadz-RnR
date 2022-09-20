import express, {Express} from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import {pool} from '../db/postgres';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());


app.get('/loaderio-53eceec3cb7b1b9352aa2d9396281ca1',
  (req, res) => res.send('loaderio-53eceec3cb7b1b9352aa2d9396281ca1'))

app.use('/reviews', router);

pool.connect()

pool.query('SELECT * FROM reviews WHERE id = 1 limit 1', (err, res) => {
  if (err) {console.log('psql db connection err')}
  else {console.log('psql db connected')}
})

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
