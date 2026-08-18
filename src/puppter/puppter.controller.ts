import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Res,Logger,
  BadRequestException,
} from '@nestjs/common';
import type { Response } from 'express';
import {PuppeterService} from './puppter.service'
// puppeteer is usually used for generationl 
@Controller('puppter')
export class PuppterController {
  constructor(private readonly puppterService: PuppeterService) {}
  private log=new Logger(PuppterController.name)
  
  // For Reporting
  // To download the pdf , convert the html code to pdf .
  @Post('pdf/html')
  async getPdfFromHtml(@Body('html') html: string, @Res() res: Response) {
    if (!html) throw new BadRequestException('html body field is required');
    const pdf = await this.puppterService.generatePdfFromHtml(html);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
      'Content-Length': pdf.length,
    });
    res.end(pdf);
  }

    @Post('pdf/report')
  async getPdfFromHtmlReport(@Res() res: Response) {
    // if (!html) throw new BadRequestException('html body field is required');
    const pdf = await this.puppterService.generatePdfFromHtmlFromInternalData();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="document.pdf"',
      'Content-Length': pdf.length,
    });
    res.end(pdf);
  }
}
