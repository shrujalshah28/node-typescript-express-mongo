import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import Mail from 'nodemailer/lib/mailer';

import { Config } from '../config/config';

export class Email {
  private smtpTransporter: Mail;

  constructor(config: Config) {
    this.smtpTransporter = this.createSmtpTransporter({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    });
  }

  /**
   * Create a new node mailer SMTP transporter.
   * @param host - host address
   * @param port - port of the host
   * @param user - auth user
   * @param pass - password
   */
  public createSmtpTransporter({
    host,
    port,
    user,
    pass,
    secure = false,
  }: {
    host: string;
    port: number;
    user: string;
    pass: string;
    secure?: boolean;
  }) {
    return nodemailer.createTransport(
      smtpTransport({
        host,
        port,
        auth: {
          user,
          pass,
        },
        secure,
      }),
    );
  }

  /**
   * Sends a simple mail to the receiver.
   * @param args.from - sender of the mail
   * @param args.to - receiver of the mail
   * @param args.subject - subject of the mail
   * @param args.text - text content of the mail
   * @param args.html - html content of the mail
   * @param transport - optional customer SMTP transporter
   */
  public async sendSimpleMail({
    from,
    to: addresses,
    subject,
    text,
    transporter,
    html,
    replyTo,
    attachments = [],
  }: {
    from: string;
    to: string | string[];
    subject: string;
    text?: string;
    transporter?: Mail;
    html?: string;
    replyTo?: string;
    attachments?: Mail.Attachment[];
  }) {
    const to = typeof addresses === 'string' ? addresses : addresses.join(',');
    await this.send({ from, to, subject, text, html, replyTo, attachments }, transporter);
  }

  /**
   * Send a mail via the given transporter.
   * @param mailOptions - mail options
   * @param transport - the transport
   */
  public async send(mailOptions: Mail.Options, transport: Mail = this.smtpTransporter) {
    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
}
