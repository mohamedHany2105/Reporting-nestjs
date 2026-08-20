import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from 'node_modules/@nestjs-modules/mailer/dist/mailer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {join} from 'path';
import { HandlebarsAdapter } from 'node_modules/@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Module({
  imports: [MailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      transport: {
        host: configService.get<string>('MAIL_HOST'),
        port: configService.get<number>('MAIL_PORT'),
        auth: {
          user: configService.get<string>('MAIL_USER'),
          pass: configService.get<string>('MAIL_PASSWORD'),
        },
        secure: false, // true for 465, false for other ports
      },
    defaults: {
          from: `"My App" <${configService.get('MAIL_FROM')}>`,
        },
            template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: { strict: true },
        },
    })
  })],
  controllers: [],
  providers: [MailService],
})
export class MailModule {}
