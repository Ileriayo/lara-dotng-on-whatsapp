import browserService from '../services/browserService';
import messagingService from '../services/messagingService';
import laraRespService from '../services/laraRespService';

export default class WhatsappBot {
  static async getLaraRoutes(clientRequest) {
    try {
      const respFromBrowser = await browserService(clientRequest);
      const respFromLara = await laraRespService(respFromBrowser); 
      const botResponse = messagingService(respFromLara); 
      return botResponse;
    } catch (err) {
      console.log(err)
    }
  }
}