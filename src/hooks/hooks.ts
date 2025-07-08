// import { Before, After,BeforeAll,AfterAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
// import { chromium, Browser, Page ,BrowserContext} from '@playwright/test';
// import { pageFixture } from './pageFixture';

// let browser: Browser;
// let context:BrowserContext;


// BeforeAll(async function () {
// browser = await chromium.launch({headless:false});
// });


// Before(async function () {
//   context = await browser.newContext();
//   const page = await context.newPage();
//   pageFixture.page = page;
// });



// After(async function ({pickle,result}) {
//   console.log(result?.status);
//   if(result?.status == Status.FAILED){
//     const img = await pageFixture.page.screenshot({path: `./test-result/screenshots/${pickle.name}.png`,type: "png"})
//     await this.attach(img,"image/png");
//   }
//   await pageFixture.page.close();
//   await context.close();
  
// });


// // After(async function (){
// //   await pageFixture.page.close();
// //   await context.close();
// // });


// AfterAll(async function () {
//   await browser.close();
// });

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

let browser: Browser;
let context: BrowserContext;

// Set default timeout for all steps/hooks (60 seconds)
setDefaultTimeout(60 * 1000);

// Launch browser before all tests
BeforeAll(async function () {
  browser = await chromium.launch({
    headless: true, // ✅ change to true for Jenkins
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
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


