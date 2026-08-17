import { Module } from '@nestjs/common';
import { PuppeterService } from './puppter.service';
import { PuppterController } from './puppter.controller';

@Module({
  controllers: [PuppterController],
  providers: [PuppeterService],
})
export class PuppterModule {} 
