import twilio from 'twilio';

const { MessagingResponse } = twilio.twiml;

export default (msg) => {
    const botResponse = new MessagingResponse();
    botResponse.message(msg.toString());
    return botResponse.toString();
}