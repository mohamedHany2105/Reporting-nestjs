// puppeteer.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { launch, Browser } from 'puppeteer';

@Injectable()
export class PuppeterService implements OnModuleDestroy {
  private browser: Browser | undefined;


  // open browser ready for use
  private async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // needed in most Docker/Linux envs
      });
    }
    return this.browser;
  }

  async generatePdfFromHtml(html: string): Promise<Buffer> {
    const browser = await this.getBrowser();
    const page = await browser.newPage(); 
    try {
      await page.setContent(html, { waitUntil: 'load' });
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
      });
      return Buffer.from(pdf);
    } finally {
      await page.close();
    }
  }

  // to complete the report we will need data from DB.also we need the id of the member or itme 
  // that we will make the report on it .
  async generatePdfFromHtmlFromInternalData(): Promise<Buffer> {
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


  // it is used to shutdown the browser when the server or module downs,
  // checks the browser if there is an event on it like setcontent ,etc...
  async onModuleDestroy() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}