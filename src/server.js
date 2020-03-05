import express from 'express';
import cors from 'cors';


const app = express();

const { PORT = 3000 } = process.env;

app.use(cors());

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

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
});

export default app;