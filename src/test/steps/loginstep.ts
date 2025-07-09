import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixture';
import LoginPage from '../../pages/loginPage';

let loginPage: LoginPage;

Given('User navigates to the application', async function () {
  await pageFixture.page?.goto('https://bookcart.azurewebsites.net/');
  pageFixture.logger?.info('Navigated to the application');
  loginPage = new LoginPage(pageFixture.page!);
});

Given('User click on the login link', async function () {
  await pageFixture.page?.locator('//span[contains(text()," Login ")]').click();
  pageFixture.logger?.info('Clicked on the login link');
});

Given('User enter the username as {string}', async function (username: string) {
  await loginPage.enterUsername(username);
  pageFixture.logger?.info(`Entered username: ${username}`);
});

Given('User enter the password as {string}', async function (password: string) {
  await loginPage.enterPassword(password);
  pageFixture.logger?.info('Entered password');
});

When('User click on the login button', async function () {
  await loginPage.clickLoginButton();
  pageFixture.logger?.info('Clicked login button');
});

Then('login should be success', async function () {
  const userLabel = pageFixture.page!.locator("//span[text()=' soundar']");
  await expect(userLabel).toBeVisible({ timeout: 5000 });
  await expect(userLabel).toHaveText(/soundar/, { timeout: 5000 });
  pageFixture.logger?.info('Login was successful');
});


Then('login should fail', async function () {
  const errorToast = pageFixture.page!.locator("//mat-error[text()='Password is required']");
  await expect(errorToast).toBeVisible({ timeout: 5000 });
  await expect(errorToast).toContainText('Password is required');
  pageFixture.logger?.info('Login failed as expected');
});
