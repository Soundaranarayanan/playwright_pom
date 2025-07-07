import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

Then('User search the book {string}', async function (book: string) {
  await pageFixture.page.locator("//input[@type='search']").fill(book);
  const option = pageFixture.page.locator("//mat-option//span").first();

  if (await option.isVisible({ timeout: 5000 })) {
    await option.click();
  } else {
    console.log(`No search results found for: ${book}`);
  }
});

Then('User add the book to cart', async function () {
  const bookTitle = await pageFixture.page.locator("//mat-card-title").first().textContent();
  const addToCart = pageFixture.page.locator(`//mat-card[.//mat-card-title[contains(text(),"${bookTitle?.trim()}")]]//button[@color='primary']`);

  await expect(addToCart).toBeVisible({ timeout: 10000 });
  await addToCart.click();

  const toast = pageFixture.page.locator("simple-snack-bar");
  await expect(toast).toBeVisible({ timeout: 10000 });
  await toast.waitFor({ state: 'hidden', timeout: 10000 });
});

Then('User can view the book carted', async function () {
  const badgeLocator = await pageFixture.page.locator("#mat-mdc-badge-content-0").textContent();
  expect(Number(badgeLocator)).toBeGreaterThan(0);
});
