import { Router } from 'express';

import botRouter from './botRoute';

const v1Router = Router();
v1Router.use('/bot', botRouter);

export default v1Router;