import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";

const USER_NAME = process.env.USER_NAME;
const USER_PASSWORD = process.env.PASSWORD;
const URL = process.env.URL;
describe("Login application", () => {
  it("should login with valid credentials", async () => {
    loginPage.open();
    await loginPage.login(USER_NAME, USER_PASSWORD);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(URL + "inventory.html");

    const infoItem = $$(".inventory_item")[0];
    expect(infoItem).toHaveElementClass("inventory_item");
  });

  it("shouldn't login with invalid password credentials", async () => {
    loginPage.open();
    await loginPage.login(USER_NAME, USER_PASSWORD + 1);
    const errorMassage = $$(".error-message-container")[0];
    expect(await errorMassage.getText()).toEqual(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("shouldn't login with invalid login credentials", async () => {
    loginPage.open();
    await loginPage.login(USER_NAME + 1, USER_PASSWORD);
    const errorMassage = $$(".error-message-container")[0];
    expect(await errorMassage.getText()).toEqual(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Login and logout", async () => {
    loginPage.open();
    await loginPage.login(USER_NAME, USER_PASSWORD);
    itemPage.clickBurButt();
    itemPage.clickLogOut();

    const getUserVal = await loginPage.getUserValue();
    const getPassVal = await loginPage.getPassValue();
    const currentUrl = await browser.getUrl();

    expect(getUserVal).toBe();
    expect(getPassVal).toBe();

    expect(currentUrl).toContain(URL);
  });
});
