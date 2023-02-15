import { Global, Injectable } from '@nestjs/common';
import { nodemailerConfig } from 'config/mail';
import { MailOptions, Options } from './mail.service.interface';
import * as nodemailer from 'nodemailer';

@Global()
@Injectable()
export class MailService {
  async sendMail(
    email: string,
    subject: string,
    mailBody: string,
  ): Promise<boolean | null> {
    const mailOptions: Options = {
      from: nodemailerConfig.user,
      to: email,
      subject,
      html: mailBody,
    };
    try {
      const transporter: nodemailer.Transporter = nodemailer.createTransport(
        nodemailerConfig.options as MailOptions,
      );
      const res = await transporter.sendMail(mailOptions);
      if (!res) return false;
      return true;
    } catch (error) {
      console.log(error.response);
    }
  }
}
