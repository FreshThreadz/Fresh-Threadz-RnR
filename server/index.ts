import express, {Express} from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/reviews', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
