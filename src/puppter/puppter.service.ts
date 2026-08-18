// puppeteer.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { launch, Browser } from 'puppeteer';

@Injectable()
export class PuppeterService implements OnModuleDestroy {
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

  async getPageContent(url: string): Promise<string> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      return await page.content();
    } finally {
      await page.close();
    }
  }

  async generatePdfFromUrl(url: string): Promise<Buffer> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
      });
      return Buffer.from(pdf);
    } finally {
      await page.close();
    }
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

  async onModuleDestroy() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}