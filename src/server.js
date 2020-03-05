import express from 'express';
import cors from 'cors';
import ngrok from 'ngrok'

import v1Routes from './route';

const app = express();

const { PORT = 3000 } = process.env;

app.use(cors());

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());
app.use(v1Routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

app.listen(PORT, async (err) => {
  if (err) console.log('Error:', err)
  console.log(`App Listening on port ${PORT}`);

  try {
    const url = await ngrok.connect(PORT);
    console.log(`App server is publicly-accessible at ${url}`);
  } catch (err) {
    console.log('Ngrok Error: ', err)
  }
});

export default app;