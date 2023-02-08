import { Global, Injectable } from '@nestjs/common';
import { sendGridConfig } from 'config/mail';
import * as sendGrid from '@sendgrid/mail';

@Global()
@Injectable()
export class MailService {
  async sendMail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    try {
      sendGrid.setApiKey(sendGridConfig.apiKey);
      const data = {
        to,
        from: 'info@nid_validator.com',
        subject,
        text,
        html,
      };

      await sendGrid.send(data);
    } catch (err) {
      console.log('sendMail err: ', JSON.stringify(err, null, 2));
    }
  }
}
