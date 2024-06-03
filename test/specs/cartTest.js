import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import shoppingCartPage from "../pageobjects/cart.page.js";
import itemPage from "../pageobjects/item.page.js";

const USER_NAME = process.env.USER_NAME;
const USER_PASSWORD = process.env.PASSWORD;
const URL = process.env.URL;

describe("Shopping cart testing", () => {
  beforeEach(async () => {
    loginPage.open();
    await browser.pause(200);
    await loginPage.login(USER_NAME, USER_PASSWORD);
  });

  it("should add product to cart and check him after Logout/Login", async () => {
    //find some element and add it to cart
    shoppingCartPage.clickAddButton();
    const cartBadge = await shoppingCartPage.cartBadge.getText();
    expect(cartBadge).toHaveText("1");
    //open cart check url
    shoppingCartPage.clickCartButton();
    await browser.pause(1000);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(URL + "cart.html");
    // add item from cart to array#1
    await browser.pause(100);
    const informationProductCart = await shoppingCartPage.cartContents[0];
    const cartItemName = await informationProductCart
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    //Logout
    itemPage.clickBurgerButton();
    await browser.pause(100);

    itemPage.clickLogOut();
    await browser.pause(100);

    //Login + open cart
    await loginPage.login(USER_NAME, USER_PASSWORD);
    shoppingCartPage.clickCartButton();
    await browser.pause(100);
    //Add items from cart to array after logout>login
    const cartInformationAfterLogout = await shoppingCartPage.cartContents[0];
    const cartItemNameAfterLogout = await cartInformationAfterLogout
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    //checking whether the items are the same
    expect(cartItemName).toEqual(cartItemNameAfterLogout);
    const newUrl = await browser.getUrl();
    expect(newUrl).toContain(URL + "cart.html");
  });
});
