import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";
import cartPage from "../pageobjects/cart.page.js";

describe("Sorting", () => {
  beforeEach(async () => {
    loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
  });

  it("e2e test", async () => {
    //find some element and add it to cart
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
    itemPage.clickAddProduct();

    const cartBadge = await $(".shopping_cart_badge");
    cartBadge.getText();
    expect(cartBadge).toHaveText("1");
    await browser.pause(500);
    //open cart check url
    cartPage.clickCartBut();
    await browser.pause(500);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("https://www.saucedemo.com/cart.html");
    // add item from cart to array
    const too = $$("#cart_contents_container")[0];
    const openCatr = await too
      .$$(".cart_item_label")
      .map(async (name) => (await name.getText()).replace("Remove", "").trim());
    expect(openCatr).toEqual(beforeAdd);

    cartPage.clickCheckOut();

    await cartPage.personInfo("Sasha", "Sto", "1234");
    await browser.pause(500);
    const secUr = await browser.getUrl();
    expect(secUr).toContain("https://www.saucedemo.com/checkout-step-two.html");
    const overPage = $$(".cart_list")[0];
    const overCheck = await overPage
      .$$(".cart_item_label")
      .map(async (name) => (await name.getText()).trim());
    expect(overCheck).toEqual(beforeAdd);

    const sumInfo = $$(".summary_info")[0];
    const taxVal = await sumInfo
      .$$(".summary_tax_label")
      .map(async (tax) => (await tax.getText()).replace("Tax: $", "").trim());
    const total = await sumInfo
      .$$(".summary_total_label")
      .map(async (tot) => (await tot.getText()).replace("Total: $", "").trim());

    expect(Number(total)).toEqual(Number(taxVal) + Number(cashVal));
    await browser.pause(500);
    cartPage.clickFinish();
    await browser.pause(500);
    const finishUrl = await browser.getUrl();
    expect(finishUrl).toContain(
      "https://www.saucedemo.com/checkout-complete.html"
    );
    const finishText = (await (await $(".complete-header")).getText()).trim();
    expect(finishText).toEqual("Thank you for your order!");

    cartPage.clickBackHomeBut();
    await browser.pause(300);
    const pageUrl = await browser.getUrl();
    expect(pageUrl).toContain("https://www.saucedemo.com/inventory.html");

    expect(infoItem).toHaveElementClass("inventory_item");
  });
  it("Empty e2e test", async () => {
    //open cart check url
    await browser.pause(200);
    cartPage.clickCartBut();
    await browser.pause(200);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("https://www.saucedemo.com/cart.html");

    cartPage.clickCheckOut();
    await browser.pause(200);

    const afterClickBtn = await browser.getUrl();
    expect(afterClickBtn).toContain(currentUrl);
  });
});
