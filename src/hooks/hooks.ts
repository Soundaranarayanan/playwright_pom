import {
  BeforeAll,
  Before,
  After,
  AfterAll,
  setDefaultTimeout,
  Status,
} from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { createLogger } from 'winston';
import { options } from '../helper/util/logger';
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


Before(   async function ({pickle}) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
  pageFixture.logger = createLogger(options(scenarioName));
  
});

After(async function ({pickle,result}) {
    console.log(result?.status);
    if (result?.status == Status.FAILED && pageFixture.page) {
      const screenshot = await pageFixture.page.screenshot({path:`./test-result/screenshots/${pickle.name}.png`,type: 'png'});
      this.attach(screenshot, 'image/png');
    }
    if (pageFixture.page) {
      await pageFixture.page.close();
    }
    await context.close();
    await pageFixture.logger?.close();
  });

AfterAll(async function () {
  await browser.close();
});


