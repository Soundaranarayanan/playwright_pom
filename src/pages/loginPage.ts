import { Locator, Page,expect } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class LoginPage {
    private base:PlaywrightWrapper;
    private loginBtn: Locator;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.loginBtn = this.page.locator('//button[@class="mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base"]//span[2]');
    }
    private Elements = {
        userInput: "//input[@placeholder='Username']",
        passwordInput: "//input[@placeholder='Password']",
        errorMessage: "//mat-error[contains(text(),'Password is required')]",
        loginBtn: '//button[@class="mdc-button mdc-button--raised mat-mdc-raised-button mat-primary mat-mdc-button-base"]//span[2]',
        name:'//span[contains(text()," Swagger ")]//parent::a//preceding-sibling::mat-menu//preceding-sibling::a//child::span[2]//span'
    };
    async clickLoginLink() {
            await this.page.locator(this.Elements.loginBtn).click();
        }
        async enterUsername(username: string) {
            await this.page.locator(this.Elements.userInput).fill(username);
        }
        async enterPassword(password: string) {
            await this.page.locator(this.Elements.passwordInput).fill(password);
        }
        async clickLoginButton() {
            await this.page.locator(this.Elements.loginBtn).click();
        }
        async verifyLoginSuccess(expectedUsername: string) {
            const name = await this.page.locator(this.Elements.name).textContent();
            await expect(name).toBe(expectedUsername);
        }
        async verifyLoginFailure(expectedErrorMessage: string) {
            const errorMessage = await this.page.locator(this.Elements.errorMessage).textContent();
            await expect(errorMessage).toBe(expectedErrorMessage);
        }
    }