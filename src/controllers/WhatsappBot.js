import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const { MessagingResponse } = twilio.twiml;

/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */
class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - Object representing response message
   */
  static async sendDirection(req, res, next) {
    const userRequest = req.body.Body;

    console.log('User request', userRequest)

    
    const botResponse = new MessagingResponse();
    try {

      botResponse.message('Some message');

      res.set('Content-Type', 'text/xml');

      return res.status(200).send(botResponse.toString());
    } catch (error) {
      return next(error);
    }
  }
}

export default WhatsappBot;