import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import cartPage from "../pageobjects/cart.page.js";
import itemPage from "../pageobjects/item.page.js";
xdescribe("Sorting", () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
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
    browser.pause(500);

    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain("https://www.saucedemo.com/cart.html");
    // add item fкom cart to array#1
    const too = await cartPage.cartContents[0];
    const openCatr = await too
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    console.log(openCatr);
    //Logout
    await itemPage.clickBurButt();
    await browser.pause(500);

    await itemPage.clickLogOut();
    browser.pause(500);

    //Login + open cart
    browser.pause(500);
    await loginPage.login("standard_user", "secret_sauce");
    await cartPage.clickCartBut();
    browser.pause(500);
    //Add items from cart to array after logout>login
    const after = await cartPage.cartContents[0];
    const afterLogout = await after
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    console.log(afterLogout);
    //checking whether the items are the same
    let areEqual = true;
    expect(openCatr).toEqual(afterLogout);
    const newUrl = await browser.getUrl();
    expect(newUrl).toContain("https://www.saucedemo.com/cart.html");
    expect(areEqual).toContain === true;
  });
});
