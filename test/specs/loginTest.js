import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";

const errorMessage =
  "Epic sadface: Username and password do not match any user in this service";
const USER_NAME = process.env.USER_NAME;
const USER_PASSWORD = process.env.PASSWORD;
const URL = process.env.URL;
describe("Login application", () => {
  it("should login with valid credentials", async () => {
    loginPage.open();
    await loginPage.login(USER_NAME, USER_PASSWORD);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(URL + "inventory.html");

    const itemInform = $$(".inventory_item")[0];
    expect(itemInform).toHaveElementClass("inventory_item");
  });

  it("shouldn't login with invalid password credentials", async () => {
    loginPage.open();
    await loginPage.login(USER_NAME, USER_PASSWORD + 1);
    const errorMassageContainer = $$(".error-message-container")[0];
    expect(await errorMassageContainer.getText()).toEqual(errorMessage);
  });

  it("shouldn't login with invalid login credentials", async () => {
    loginPage.open();
    await loginPage.login(USER_NAME + 1, USER_PASSWORD);
    const errorMassageContainer = $$(".error-message-container")[0];
    expect(await errorMassageContainer.getText()).toEqual(errorMessage);
  });

  it("Login and logout", async () => {
    loginPage.open();
    await loginPage.login(USER_NAME, USER_PASSWORD);
    itemPage.clickBurgerButton();
    itemPage.clickLogOut();

    const getUserValue = await loginPage.getUserValue();
    const getPassValue = await loginPage.getPassValue();
    const currentUrl = await browser.getUrl();

    expect(getUserValue).toBe();
    expect(getPassValue).toBe();

    expect(currentUrl).toContain(URL);
  });
});
