import express from 'express';
import tracing from './tracing';

tracing.start();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
