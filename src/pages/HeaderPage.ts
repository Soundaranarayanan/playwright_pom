import {expect,Page,Locator} from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
export default class HeaderPage{
    private base: PlaywrightWrapper;
    constructor(private page: Page){
        this.base = new PlaywrightWrapper(page);
    }
    private headerPageElements = {
        searchInput:"Search books or authors",
        cartBtn:"button.mat-focus-indicator.mat-icon-button",
        cartValue:"#mat-badge-content-0",
        userMenu:"//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]",
        myOrder:"//button[text()='My Orders' and @role='menuitem']",
        logoutLink:"//button[text()='Logout' and @role='menuitem']",
        
    }
private get loginLink():Locator{
    return this.page.getByRole('button',{name:'Login'});
}

async enterBookName(bookname:string){
    await this.page.getByPlaceholder(this.headerPageElements.searchInput).type(bookname);
await this.base.waitAndClick("mat-option[role='option']");
}
// async logoutUser(){
//     await this.clickOnUserMenu();
//     await.this.base.navigateTo(this.headerPageElements.logoutLink);

// }
async verifyLoginSuccess(){
    await expect(this.page.locator(this.headerPageElements.userMenu)).toBeVisible();
}

}