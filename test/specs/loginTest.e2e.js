import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import ItemPage from "../pageobjects/item.page.js";
import itemPage from "../pageobjects/item.page.js";

xdescribe("Login application", () => {
  it("should login with valid credentials", async () => {
    await LoginPage.open();

    await LoginPage.login("standard_user", "secret_sauce");
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("https://www.saucedemo.com/inventory.html");

    const infoItem = await $$(".inventory_item")[0];
    await expect(infoItem).toHaveElementClass("inventory_item");
  });

  it("shouldn't login with invalid password credentials", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce" + 1);
    const errorMassage = await $$(".error-message-container")[0];
    console.log(await errorMassage.getText());
    expect(await errorMassage.getText()).toEqual(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("shouldn't login with invalid login credentials", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user" + 1, "secret_sauce");
    const errorMassage = await $$(".error-message-container")[0];
    console.log(await errorMassage.getText());
    expect(await errorMassage.getText()).toEqual(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Login and logout", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await ItemPage.clickBurButt();
    await browser.pause(3000);
    await itemPage.clickLogOut();

    // const getUserVal = await LoginPage.inputUsername.getValue();
    // const userValue = await $("#user-name");
    // const passValue = $("#password");
    // const getUserVal = await userValue.getValue();
    // const getPassVal = await passValue.getValue();

    const getUserVal = await LoginPage.getUserValue();
    const getPassVal = await LoginPage.getPassValue();
    const currentUrl = await browser.getUrl();

    console.log("Login val = " + getUserVal);
    console.log("Pass val = " + getPassVal);
    await expect(getUserVal).toBe();
    await expect(getPassVal).toBe();

    await expect(currentUrl).toContain("https://www.saucedemo.com/");
  });
});
