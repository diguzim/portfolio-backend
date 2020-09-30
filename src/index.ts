import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import './db/mongoose';
import projectRouter from './routers/project';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(projectRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
