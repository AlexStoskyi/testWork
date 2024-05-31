import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import cartPage from "../pageobjects/cart.page.js";
import itemPage from "../pageobjects/item.page.js";
xdescribe("Sorting", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
  });

  it("Cart test", async () => {
    //find some element and add it to cart
    await cartPage.clickAddBut();
    const cartBadge = await cartPage.catrBadge;
    await cartBadge.getText();
    console.log("This is value from =" + cartBadge);
    await expect(cartBadge).toHaveText("1");
    //open cart check url
    console.log(cartPage.cart, cartPage.cartContents);
    await cartPage.clickCartBut();
    await browser.pause(500);

    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain("https://www.saucedemo.com/cart.html");
    // add item fкom cart to array#1
    const too = await cartPage.cartContents[0];
    const OpenCatr = await too
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    console.log(OpenCatr);
    //Logout
    await itemPage.clickBurButt();
    await browser.pause(500);

    await itemPage.clickLogOut();
    await browser.pause(500);

    //Login + open cart
    await browser.pause(500);
    await LoginPage.login("standard_user", "secret_sauce");
    await cartPage.clickCartBut();
    await browser.pause(500);
    //Add items from cart to array after logout>login
    const after = await cartPage.cartContents[0];
    const afterLogout = await after
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    console.log(afterLogout);
    //checking whether the items are the same
    let areEqual = true;
    await expect(OpenCatr).toEqual(afterLogout);
    const newUrl = await browser.getUrl();
    await expect(newUrl).toContain("https://www.saucedemo.com/cart.html");
    (await expect(areEqual).toContain) === true;
  });
});
