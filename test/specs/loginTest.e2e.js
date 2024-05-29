import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import getingValue from "../pageobjects/secure.page.js";

xdescribe("My Login application", () => {
  it("should login with valid credentials", async () => {
    await LoginPage.open();

    await LoginPage.login("standard_user", "secret_sauce");
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("https://www.saucedemo.com/inventory.html");
  });

  it("shouldn't login with invalid password credentials", async () => {
    await LoginPage.open();
    const expectedError =
      "Epic sadface: Username and password do not match any user in this service";
    await LoginPage.login("standard_user", "secret_sauce" + 1);
    const errorMassage = await $$(".error-message-container")[0];
    console.log(await errorMassage.getText());
    expect(await errorMassage.getText()).toBe(expectedError);
  });

  it("shouldn't login with invalid login credentials", async () => {
    await LoginPage.open();
    const expectedError =
      "Epic sadface: Username and password do not match any user in this service";
    await LoginPage.login("standard_user" + 1, "secret_sauce");
    const errorMassage = await $$(".error-message-container")[0];
    console.log(await errorMassage.getText());
    expect(await errorMassage.getText()).toBe(expectedError);
  });

  it.only("Login and logout", async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");

    const burgerButton = $("#react-burger-menu-btn");
    await burgerButton.click();
    const logoutButt = $("=Logout");
    await logoutButt.click();

    const userValue = await $("#user-name");
    const passValue = $("#password");
    const getUserVal = await userValue.getValue();
    const getPassVal = await passValue.getValue();
    await expect(getUserVal).toContain("");
    await expect(getPassVal).toContain("");

    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain("https://www.saucedemo.com/");
  });
});
