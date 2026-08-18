import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedularModule } from './schedular/schedular.module';
import { SchedularController } from './schedular/schedular.controller';
// import { SchedularService } from './schedular/schedular.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PuppterModule } from './puppter/puppter.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressModule } from './progress/progress.module';

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
 SchedularModule,
PuppterModule,
ProgressModule ],
  controllers: [AppController, SchedularController],
  providers: [AppService],
})
export class AppModule {}
