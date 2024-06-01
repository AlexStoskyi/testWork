import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import cartPage from "../pageobjects/cart.page.js";
import itemPage from "../pageobjects/item.page.js";

const USER_NAME = process.env.USER_NAME;
const USER_PASSWORD = process.env.PASSWORD;
const URL = process.env.URL;
describe("Sorting", () => {
  beforeEach(async () => {
    loginPage.open();
    await loginPage.login(USER_NAME, USER_PASSWORD);
  });

  it("Cart test", async () => {
    //find some element and add it to cart
    cartPage.clickAddBut();
    const cartBadge = await cartPage.catrBadge;
    cartBadge.getText();
    expect(cartBadge).toHaveText("1");
    //open cart check url
    cartPage.clickCartBut();
    await browser.pause(300);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(URL + "cart.html");
    // add item from cart to array#1
    await browser.pause(100);
    const too = await cartPage.cartContents[0];
    const openCatr = await too
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    //Logout
    itemPage.clickBurButt();
    await browser.pause(100);

    itemPage.clickLogOut();
    await browser.pause(100);

    //Login + open cart
    await loginPage.login(USER_NAME, USER_PASSWORD);
    cartPage.clickCartBut();
    await browser.pause(100);
    //Add items from cart to array after logout>login
    const after = await cartPage.cartContents[0];
    const afterLogout = await after
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    //checking whether the items are the same
    expect(openCatr).toEqual(afterLogout);
    const newUrl = await browser.getUrl();
    expect(newUrl).toContain(URL + "cart.html");
  });
});
