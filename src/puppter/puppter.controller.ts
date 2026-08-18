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

@Controller('puppter')
export class PuppterController {
  constructor(private readonly puppterService: PuppeterService) {}
  private log=new Logger(PuppterController.name)
  @Get('pdf')
  makePdf(@Query("url") url:string){
   try{
    console.log(url)
     this.log.verbose("all is ok")
     return this.puppterService.getPageContent(url)

   }catch(error){
this.log.error("error in url",error)
   }
  }
    @Get('content')
  async getContent(@Query('url') url: string) {
    if (!url) throw new BadRequestException('url query param is required');
    const content = await this.puppterService.getPageContent(url);
    return { content };
  }

  @Get('pdf')
  async getPdfFromUrl(@Query('url') url: string, @Res() res: Response) {
    if (!url) throw new BadRequestException('url query param is required');
    const pdf = await this.puppterService.generatePdfFromUrl(url);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="page.pdf"',
      'Content-Length': pdf.length,
    });
    res.end(pdf);
  }

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
}
