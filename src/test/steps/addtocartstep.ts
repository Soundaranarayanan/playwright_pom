import { Then } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";
import AddToCartPage from "../../pages/addToCartPage";

let cartPage: AddToCartPage;

Then('User search the book {string}', async function (book: string) {
  cartPage = new AddToCartPage(pageFixture.page!);
  await cartPage.searchBook(book);
  pageFixture.logger?.info(`Searched for book: ${book}`);
});

Then('User add the book to cart', async function () {
  await cartPage.addBookToCart();
  pageFixture.logger?.info("Book added to cart");
});

Then('User can view the book carted', async function () {
  await cartPage.verifyCartHasBook();
  pageFixture.logger?.info("Book cart verified");
});
