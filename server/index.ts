import express, {Express} from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import {pool} from '../db/postgres';
const morgan = require('morgan');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());


app.get('/loaderio-1d1ec1fdf04a9102c236cdde81fcfa85',
  (req, res) => res.send('loaderio-1d1ec1fdf04a9102c236cdde81fcfa85'))
app.use(morgan('dev'));
app.use('/reviews', router);

pool.connect()

pool.query('SELECT * FROM reviews WHERE id = 1 limit 1', (err, res) => {
  if (err) {console.log('psql db connection err')}
  else {console.log('psql db connected')}
})

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
