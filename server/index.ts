import express, {Express} from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import {pool} from '../db/postgres';
const morgan = require('morgan');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());


// app.get(`/${process.env.LOADER}`, //loaderio link (will change after each ECS Instance stop)
//   (req, res) => res.send(process.env.LOADER))
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
