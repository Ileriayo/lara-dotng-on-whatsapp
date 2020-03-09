import express from 'express';
import cors from 'cors';

/** 
 * Uncomment this import statement to use
 * ngrok in development environment
 */
// import ngrok from 'ngrok';

import v1Routes from './api/route';
import config from './config/index';

const app = express();

const { port } = config;

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

app.listen(port, async (err) => {
  if (err) console.log('Error:', err)
  console.log(`App Listening on port ${port}`);

  /**
   * ONLY FOR DEVELOPMENT PURPOSES
   */
  // try {
  //   const url = await ngrok.connect(port);
  //   console.log(`App server is publicly-accessible at ${url}`);
  // } catch (err) {
  //   console.log('Ngrok Error: ', err)
  // }
});

export default app;