import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import ChatRouter from './chat/chat.router';
import { loadDb } from './db';

const PORT = 3000;

await loadDb();

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/chats', ChatRouter);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
