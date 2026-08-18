import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressService } from './progress.service';
import {Response} from 'express'
import { CreateProgressDto } from './dto/create-progress.dto';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post()
  create(@Param('id') createProgressDto: CreateProgressDto) {
    return this.progressService.createProgress(createProgressDto);
  }

  @Get('pdf')
  generatePDF() {
    return this.progressService.generatePDF();
  }
}
