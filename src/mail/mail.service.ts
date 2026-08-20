import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
@Injectable()
export class MailService {
      private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Welcome!',
        template: './welcome', // welcome.hbs
        context: { name },
      });
    } catch (err) {
      this.logger.error(`Failed to send welcome email to ${to}`, err);
      throw err;
    }
  }

  async sendPasswordReset(to: string, resetLink: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Reset your password',
      template: './password-reset',
      context: { resetLink },
    });
  }
}
