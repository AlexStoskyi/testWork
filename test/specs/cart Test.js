import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";

xdescribe("Sorting", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
  });

  it("Cart test", async () => {
    //find some element and add it to cart
    const producte = await $(".inventory_item");
    const buttonAdd = producte.$("#add-to-cart-sauce-labs-backpack");
    await buttonAdd.click();
    //open cart check url
    const cart = await $("#shopping_cart_container");
    await cart.click();
    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain("https://www.saucedemo.com/cart.html");
    // add item ftom cart to array#1
    const too = await $$("#cart_contents_container")[0];
    const OpenCatr = await too
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    console.log(OpenCatr);
    //Logout
    const burgerButton = $("#react-burger-menu-btn");
    await burgerButton.click();
    const logoutButt = $("=Logout");
    await logoutButt.click();
    //Login + open cart
    await LoginPage.login("standard_user", "secret_sauce");
    await cart.click();
    //Add items from cart to array after logout>login
    const after = await $$("#cart_contents_container")[0];
    const afterLogout = await after
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    console.log(afterLogout);
    //checking whether the items are the same
    let areEqual = true;

    for (let i = 0; i < OpenCatr.length; i++) {
      if (OpenCatr[i] !== afterLogout[i]) {
        areEqual = false;
        break;
      }
    }

    if (areEqual) {
      console.log(`Thay are the same`);
    } else {
      console.log(`Thay aren't the same`);
    }

    const newUrl = await browser.getUrl();
    await expect(newUrl).toContain("https://www.saucedemo.com/cart.html");
    await expect(areEqual).toContain===true;
  });
});
