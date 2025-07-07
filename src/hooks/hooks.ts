import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { pageFixture } from './pageFixture';

let browser: Browser;


setDefaultTimeout(30 * 1000); 

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  pageFixture.page = page;
});

After(async function () {
  await pageFixture.page.close();
  await browser.close();
});
