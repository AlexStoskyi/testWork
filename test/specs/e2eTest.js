import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";
import cartPage from "../pageobjects/cart.page.js";

describe("Sorting", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
  });

  it("e2e test", async () => {
    //find some element and add it to cart
    // const product = await $(".inventory_list");
    // const buttonAdd = product.$("#add-to-cart-sauce-labs-backpack");
    const infoItem = await $$(".inventory_item")[0];
    const beforeAdd = await infoItem
      .$$(".inventory_item_description")
      .map(async (name) =>
        (await name.getText()).replace("Add to cart", "").trim()
      );
    const cashVal = await infoItem
      .$$(".inventory_item_price")
      .map(async (cash) => (await cash.getText()).replace("$", "").trim());
    console.log(cashVal);
    await itemPage.clickAddProduct();

    const cartBadge = await $(".shopping_cart_badge");
    await cartBadge.getText();
    await expect(cartBadge).toHaveText("1");

    //open cart check url
    await cartPage.clickCartBut();
    await browser.pause(500);
    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain("https://www.saucedemo.com/cart.html");
    // add item from cart to array
    const too = await $$("#cart_contents_container")[0];
    const openCatr = await too
      .$$(".cart_item_label")
      .map(async (name) => (await name.getText()).replace("Remove", "").trim());
    await expect(openCatr).toEqual(beforeAdd);

    await cartPage.clickCheckOut();

    await cartPage.personInfo("Sasha", "Sto", "1234");

    const secUr = await browser.getUrl();
    await expect(secUr).toContain(
      "https://www.saucedemo.com/checkout-step-two.html"
    );
    const overPage = await $$(".cart_list")[0];
    const overCheck = await overPage
      .$$(".cart_item_label")
      .map(async (name) => (await name.getText()).trim());
    await expect(overCheck).toEqual(beforeAdd);

    const sumInfo = await $$(".summary_info")[0];
    const taxVal = await sumInfo
      .$$(".summary_tax_label")
      .map(async (tax) => (await tax.getText()).replace("Tax: $", "").trim());
    const total = await sumInfo
      .$$(".summary_total_label")
      .map(async (tot) => (await tot.getText()).replace("Total: $", "").trim());

    await expect(Number(total)).toEqual(Number(taxVal) + Number(cashVal));

    await cartPage.clickFinish();
    await browser.pause(500);
    const finishUrl = await browser.getUrl();
    await expect(finishUrl).toContain(
      "https://www.saucedemo.com/checkout-complete.html"
    );
    const finishText = (await (await $(".complete-header")).getText()).trim();
    await expect(finishText).toEqual("Thank you for your order!");

    await cartPage.clickBackHomeBut();
    await browser.pause(100);
    const pageUrl = await browser.getUrl();
    await expect(pageUrl).toContain("https://www.saucedemo.com/inventory.html");

    await expect(infoItem).toHaveElementClass("inventory_item");
  });
  it.only("Empty e2e test", async () => {
    //open cart check url
    // const cart = await $("#shopping_cart_container");
    // await cart.click();
    await cartPage.clickCartBut();
    await browser.pause(100);
    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain("https://www.saucedemo.com/cart.html");

    // const check = await $("#checkout");
    // await check.click();
    await cartPage.clickCheckOut();
    await browser.pause(100);

    const afterClickBtn = await browser.getUrl();
    await expect(afterClickBtn).toContain(currentUrl);
  });
});
