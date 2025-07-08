import {
  BeforeAll,
  Before,
  After,
  AfterAll,
  setDefaultTimeout,
  Status,
} from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { getEnv } from '../helper/env/env';
import { invokeBrowser } from '../helper/browsers/browserManager';
let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();

});

// Create new context + page before each scenario
Before(async function () {
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
});

// Close page/context after each scenario and capture screenshot if failed
After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: 'png',
    });
    await this.attach(img, 'image/png');
  }

  await pageFixture.page.close();
  await context.close();
});

// Close browser after all scenarios
AfterAll(async function () {
  await browser.close();
});


