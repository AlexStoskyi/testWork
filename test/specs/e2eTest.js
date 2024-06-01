import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";
import cartPage from "../pageobjects/cart.page.js";

const USER_NAME = process.env.USER_NAME;
const USER_PASSWORD = process.env.PASSWORD;
const URL = process.env.URL;
describe("Sorting", () => {
  beforeEach(async () => {
    loginPage.open();
    await loginPage.login(USER_NAME, USER_PASSWORD);
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

    const cartBadge = $(".shopping_cart_badge");
    cartBadge.getText();
    expect(cartBadge).toHaveText("1");
    await browser.pause(100);
    //open cart check url
    cartPage.clickCartBut();
    await browser.pause(100);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(URL + "cart.html");
    // add item from cart to array
    const too = $$("#cart_contents_container")[0];
    const openCatr = await too
      .$$(".cart_item_label")
      .map(async (name) => (await name.getText()).replace("Remove", "").trim());
    expect(openCatr).toEqual(beforeAdd);

    cartPage.clickCheckOut();

    await cartPage.personInfo("Sasha", "Sto", "1234");
    await browser.pause(100);
    const secUr = await browser.getUrl();
    expect(secUr).toContain(URL + "checkout-step-two.html");
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
    await browser.pause(100);
    cartPage.clickFinish();
    await browser.pause(100);
    const finishUrl = await browser.getUrl();
    expect(finishUrl).toContain(URL + "checkout-complete.html");
    const finishText = (await (await $(".complete-header")).getText()).trim();
    expect(finishText).toEqual("Thank you for your order!");

    cartPage.clickBackHomeBut();
    await browser.pause(100);
    const pageUrl = await browser.getUrl();
    expect(pageUrl).toContain(URL + "inventory.html");

    expect(infoItem).toHaveElementClass("inventory_item");
  });
  it("Empty e2e test", async () => {
    //open cart check url
    await browser.pause(100);
    cartPage.clickCartBut();
    await browser.pause(100);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(URL + "cart.html");

    cartPage.clickCheckOut();
    await browser.pause(100);

    const afterClickBtn = await browser.getUrl();
    expect(afterClickBtn).toContain(currentUrl);
  });
});
