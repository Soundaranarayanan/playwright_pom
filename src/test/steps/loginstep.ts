import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../../hooks/pageFixture";

Given('User navigates to the application',{timeout: 60000}, async function () {
  await pageFixture.page.goto('https://bookcart.azurewebsites.net');
});
Given('User click on the login link', async function () {
  await pageFixture.page.locator("//span[text()=' Login ']").click();
});

Given('User enter the username as {string}', async function (username: string) {
  await pageFixture.page.locator("//input[@placeholder='Username']").fill(username);
});

Given('User enter the password as {string}', async function (password: string) {
  await pageFixture.page.locator("//input[@placeholder='Password']").fill(password);
});

When('User click on the login button', async function () {
  await pageFixture.page.locator("//span[text()='Login']").click();
});

Then('login should be success', async function () {
  const userWelcome = await pageFixture.page.locator("(//span[@class='mdc-button__label']/child::span)[1]").isVisible();
  expect(userWelcome).toBeTruthy();
});

Then('login should fail', async function () {
  const errorMessage = await pageFixture.page.locator("text=Password is required").isVisible();
  expect(errorMessage).toBeTruthy();
});
