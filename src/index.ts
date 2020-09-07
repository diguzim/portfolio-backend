import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.PORT);
const app = express();
const port = process.env.PORT;

app.get('/temp', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
