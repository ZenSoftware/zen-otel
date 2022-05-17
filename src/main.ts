import './tracing';
import express from 'express';

async function bootstrap() {
  const app = express();

  app.get('/', (req, res) => {
    console.log('hit');
    res.send('Hello world!');
  });

  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

bootstrap();
