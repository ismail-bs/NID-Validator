import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailTemplateHelper {
  static emailHeaderPrefixAndCSS() {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="x-apple-disable-message-reformatting" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="color-scheme" content="light dark" />
            <meta name="supported-color-schemes" content="light dark" />
            <style type="text/css" rel="stylesheet" media="all">
                @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");

                /*---------- Root Queries ----------*/
                body {
                    background-color: #F2F4F6;
                    color: #51545E;
                }

                td {
                    word-break: break-word;
                }

                .preheader {
                    display: none !important;
                    visibility: hidden;
                    font-size: 1px;
                    line-height: 1px;
                    max-height: 0;
                    max-width: 0;
                    opacity: 0;
                    overflow: hidden;
                }

                body,
                td,
                th {
                    font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
                }

                h1 {
                    margin-top: 0;
                    color: #333333;
                    font-size: 22px;
                    font-weight: bold;
                    text-align: left;
                }

                /*---------- Buttons Queries ----------*/
                .button {
                    background-color: #3869D4;
                    border-top: 10px solid #3869D4;
                    border-right: 18px solid #3869D4;
                    border-bottom: 10px solid #3869D4;
                    border-left: 18px solid #3869D4;
                    display: inline-block;
                    color: white;
                    text-decoration: none;
                    border-radius: 3px;
                    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
                    -webkit-text-size-adjust: none;
                    box-sizing: border-box;
                }

                /*---------- Email Queries ----------*/
                .email-wrapper {
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    background-color: #F2F4F6;
                }

                .email-content {
                    width: 100%;
                    margin: 0;
                    padding: 0;
                }

                .email-masthead {
                    padding: 15px 0;
                    text-align: center;
                }

                .email-masthead_name {
                    font-size: 20px;
                    font-weight: bold;
                    color: #A8AAAF;
                    text-decoration: none;
                    text-shadow: 0 1px 0 white;
                }

                .email-body_inner {
                    width: 570px;
                    margin: 0 auto;
                    padding: 0;
                    background-color: #FFFFFF;
                }

                .body-action {
                    width: 100%;
                    margin: 30px auto;
                    padding: 0;
                    text-align: center;
                }

                .body-sub {
                    margin-top: 25px;
                    padding-top: 25px;
                    border-top: 1px solid #EAEAEC;
                }

                .content-cell {
                    padding: 40px;
                }

                /*---------- Media Queries ----------*/
                @media only screen and (max-width: 600px) {
                    .email-body_inner,
                    .email-footer {
                        width: 100% !important;
                    }
                }
            </style>
        </head>`;
  }

  static emailBodyPrefix() {
    return `
        <body>
            <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                    <td align="center">
                        <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                                <td class="email-masthead">
                                    <a class="f-fallback email-masthead_name"> NID VALIDATOR </a>
                                </td>
                            </tr>`;
  }

  static emailBodyForResetPassword(name: string, action_url: string) {
    return `
        <tr>
            <td width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td class="content-cell">
                            <div class="f-fallback">
                                <h1>Hi ${name || ''},</h1>
                                <p>
                                    You recently requested to reset your password for your account. Use the button below to reset it. 
                                    <strong> This link to reset your password is only good for the next one hour. </strong>
                                </p>
                                <!-- Action -->
                                <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td align="center">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                                <tr>
                                                    <td align="center">
                                                        <a href="${action_url}" class="f-fallback button" target="_blank"  style="color: white">
                                                            Reset your password
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <p> If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                                <p>
                                    Thanks, <br>
                                    Team NID Validator
                                </p>
                                <table class="body-sub">
                                    <tr>
                                        <td>
                                            <p class="f-fallback sub"> If the button above isn't working for you, copy and paste the URL below into your web browser. </p>
                                            <p class="f-fallback sub"> ${action_url} </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>`;
  }

  static emailBodyForSimpleMessage(name: string, message: string) {
    return `
        <tr>
            <td width="570" cellpadding="0" cellspacing="0">
                <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                        <td class="content-cell">
                            <div class="f-fallback">
                                <h1>Hi ${name},</h1> <br>
                                <p>  <center> <strong> ${message} </strong></center></p> </br>
                                <p> If this is you, disregard this email and get in touch with us if you have any inquiries.</p>
                                <p>
                                    Thanks, <br>
                                    Team NID Validator
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>`;
  }

  static emailHTMLRest() {
    return `            </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>`;
  }

  static resetPasswordTemplate(name: string, action_url: string) {
    return `${this.emailHeaderPrefixAndCSS()} ${this.emailBodyPrefix()} ${this.emailBodyForResetPassword(
      name,
      action_url,
    )} ${this.emailHTMLRest()}`;
  }

  static simpleMessageTemplate(name: string, message: string) {
    return `${this.emailHeaderPrefixAndCSS()} ${this.emailBodyPrefix()} ${this.emailBodyForSimpleMessage(
      name,
      message,
    )} ${this.emailHTMLRest()}`;
  }
}
