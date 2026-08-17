// puppeteer.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { launch, Browser } from 'puppeteer';

@Injectable()
export class PuppeterService implements OnModuleDestroy {
  private browser!: Browser;

  async getPageContent(url : string): Promise<string> {
    // Launch headless browser
    this.browser = await launch({ headless: true });

    const page = await this.browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const content = await page.content();
    await this.browser.close();

    return content;
  }

  async onModuleDestroy() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}