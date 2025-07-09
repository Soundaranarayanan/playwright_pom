import { Locator, Page, expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class AddToCartPage {
  private wrapper: PlaywrightWrapper;
  private searchBox: Locator;
  private suggestionOption: Locator;
  private addToCartBtn: Locator;
  private cartBadge: Locator;
  private snackBar: Locator;

  constructor(private page: Page) {
    this.wrapper = new PlaywrightWrapper(page);
    this.searchBox = page.locator("//input[@type='search']");
    this.suggestionOption = page.locator("mat-option[role='option'] span").first();
    this.addToCartBtn = page.locator("(//span[@class='mdc-button__label'][normalize-space()='Add to Cart'])[1]").first();
    this.cartBadge = page.locator("//span[@id='mat-badge-content-0']");
    this.snackBar = page.locator("simple-snack-bar");
  }
  async searchBook(book: string) {
    await this.searchBox.fill(book);
    try {
      await this.suggestionOption.waitFor({ state: 'visible', timeout: 5000 });
      await this.wrapper.waitAndClick(this.suggestionOption);
    } catch (e) {
      console.warn(`No suggestion found for book: ${book}`);
    }
  }
  async addBookToCart() {
    await this.wrapper.waitAndClick(this.addToCartBtn);
    await this.snackBar.waitFor({ state: 'hidden' });
  }

  async verifyCartHasBook() {
    const badgeText = await this.cartBadge.textContent();
    const badgeCount = parseInt(badgeText || '0', 10);
    expect(badgeCount).toBeGreaterThan(0);
  }
}
