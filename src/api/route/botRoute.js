import { Router } from 'express';

import WhatsappBot from '../WhatsappBot';

const botRouter = Router();

botRouter.post('/', async (req, res) => {
    const botResponse = await WhatsappBot.getLaraRoutes(req.body.Body);
    res.set('Content-Type', 'text/xml');
    return res.status(200).end(botResponse);
})

export default botRouter;