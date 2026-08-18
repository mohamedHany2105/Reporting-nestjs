import { Injectable } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { launch, Browser } from 'puppeteer';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';

@Injectable()
export class ProgressService {
  
  constructor(
        @InjectRepository(Progress,'postgres')
  private readonly  recordRepository: Repository<Progress>
  ){  }
private browser: Browser | undefined;


private async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // needed in most Docker/Linux envs
      });
    }
    return this.browser;
}


 async createProgress(createProgressDto: CreateProgressDto){
  const { id } = createProgressDto;
  const account= await this.recordRepository.findOne({ where: { id } });
  if(!account){
throw new Error(`Progress record with id ${id} not found`);
  }

  return account;
 }


 async generatePDF(){
      const browser = await this.getBrowser();
    const page = await browser.newPage();
    const html=`
    <body><h1>Report</h1><p>This is a sample report generated from internal data.</p></body>
    `;

    try{
      await page.setContent(html);
      const pdf =await page.pdf({
        format: 'A4',
        printBackground: true,
      });
      return Buffer.from(pdf);
    } catch (err) {
      throw err;
    } finally {
      await page.close();
    }

 }
}
