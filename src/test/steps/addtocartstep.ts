import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";


Then('User search the book {string}', async function (book) {
    const searchBox = pageFixture.page.locator("//input[@type='search']");
    await searchBox.fill(book);

    const option = pageFixture.page.locator("mat-option[role='option'] span").first();

    try {
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
    } catch (error) {
        console.warn(`No suggestions available for book: "${book}"`);
        // Optional: assert if it's a negative test
    }
});


Then('User add the book to cart', async function () {
    // await this.page.locator("(//span[@class='mdc-button__label'][normalize-space()='Add to Cart'])[1]").click();
    const addtoCart = await pageFixture.page.locator("(//span[@class='mdc-button__label'][normalize-space()='Add to Cart'])[1]").first();
    await addtoCart.waitFor({ state: 'visible' });
    await addtoCart.click();

    const toast = pageFixture.page.locator("simple-snack-bar");
    await expect(toast).toBeVisible();
    await toast.waitFor({ state: 'hidden' });
         });

Then('User can view the book carted', async function () {

    const badgelocator = await pageFixture.page.locator("//span[@id='mat-badge-content-0']").textContent();
    const badgelocatorNumber = parseInt(badgelocator || '0', 10);
    await expect(badgelocatorNumber).toBeGreaterThan(0);
         });
