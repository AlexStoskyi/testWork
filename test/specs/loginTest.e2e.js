import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";

xdescribe("Login application", () => {
  it("should login with valid credentials", async () => {
    loginPage.open();

    await loginPage.login("standard_user", "secret_sauce");
    browser.pause(500);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("https://www.saucedemo.com/inventory.html");

    const infoItem = $$(".inventory_item")[0];
    expect(infoItem).toHaveElementClass("inventory_item");
  });

  it("shouldn't login with invalid password credentials", async () => {
    loginPage.open();
    await loginPage.login("standard_user", "secret_sauce" + 1);
    const errorMassage = $$(".error-message-container")[0];
    console.log(await errorMassage.getText());
    expect(await errorMassage.getText()).toEqual(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("shouldn't login with invalid login credentials", async () => {
    loginPage.open();
    await loginPage.login("standard_user" + 1, "secret_sauce");
    const errorMassage = $$(".error-message-container")[0];
    console.log(await errorMassage.getText());
    expect(await errorMassage.getText()).toEqual(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Login and logout", async () => {
    loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    itemPage.clickBurButt();
    browser.pause(500);
    itemPage.clickLogOut();

    const getUserVal = await loginPage.getUserValue();
    const getPassVal = await loginPage.getPassValue();
    const currentUrl = await browser.getUrl();

    console.log("Login val = " + getUserVal);
    console.log("Pass val = " + getPassVal);
    expect(getUserVal).toBe();
    expect(getPassVal).toBe();

    expect(currentUrl).toContain("https://www.saucedemo.com/");
  });
});
