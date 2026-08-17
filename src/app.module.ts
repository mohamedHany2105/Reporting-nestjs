import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedularModule } from './schedular/schedular.module';
import { SchedularController } from './schedular/schedular.controller';
import { SchedularService } from './schedular/schedular.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),ScheduleModule.forRoot(),
// TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// }),
 SchedularModule ],
  controllers: [AppController, SchedularController],
  providers: [AppService, SchedularService],
})
export class AppModule {}
