import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { SchedularService } from './schedular/schedular.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressModule } from './progress/progress.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),ScheduleModule.forRoot(),
TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST, 
  port:5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}),
 MailModule,

ProgressModule,
MailModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
