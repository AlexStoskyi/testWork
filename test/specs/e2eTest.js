import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";
import shoppingCartPage from "../pageobjects/cart.page.js";

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
    const itemInformation = $$(".inventory_item")[0];
    const descriptionItem = await itemInformation
      .$$(".inventory_item_description")
      .map(async (name) =>
        (await name.getText()).replace("Add to cart", "").trim(),
      );
    const itemPrice = await itemInformation
      .$$(".inventory_item_price")
      .map(async (cash) => (await cash.getText()).replace("$", "").trim());
    itemPage.clickAddProduct();

    const cartBadge = $(".shopping_cart_badge");
    cartBadge.getText();
    expect(cartBadge).toHaveText("1");
    await browser.pause(100);
    //open cart check url
    shoppingCartPage.clickCartButton();
    await browser.pause(100);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(URL + "cart.html");
    // add item from cart to array
    const cartContents = $$("#cart_contents_container")[0];
    const cartItemInformation = await cartContents
      .$$(".cart_item_label")
      .map(async (name) => (await name.getText()).replace("Remove", "").trim());
    expect(cartItemInformation).toEqual(descriptionItem);

    shoppingCartPage.clickCheckOut();

    await shoppingCartPage.personInfo("Sasha", "Sto", "1234");
    await browser.pause(100);
    const verificationUrl = await browser.getUrl();
    expect(verificationUrl).toContain(URL + "checkout-step-two.html");
    const overviewPage = $$(".cart_list")[0];
    const overviewCheckItem = await overviewPage
      .$$(".cart_item_label")
      .map(async (name) => (await name.getText()).trim());
    expect(overviewCheckItem).toEqual(descriptionItem);

    const summeryInformation = $$(".summary_info")[0];
    const taxValue = await summeryInformation
      .$$(".summary_tax_label")
      .map(async (tax) => (await tax.getText()).replace("Tax: $", "").trim());
    const totalValue = await summeryInformation
      .$$(".summary_total_label")
      .map(async (total) =>
        (await total.getText()).replace("Total: $", "").trim(),
      );

    expect(Number(totalValue)).toEqual(Number(taxValue) + Number(itemPrice));
    await browser.pause(100);
    shoppingCartPage.clickFinish();
    await browser.pause(100);
    const finishUrl = await browser.getUrl();
    expect(finishUrl).toContain(URL + "checkout-complete.html");
    const finishText = (await (await $(".complete-header")).getText()).trim();
    expect(finishText).toEqual("Thank you for your order!");

    shoppingCartPage.clickBackHomeButton();
    await browser.pause(100);
    const pageUrl = await browser.getUrl();
    expect(pageUrl).toContain(URL + "inventory.html");

    expect(itemInformation).toHaveElementClass("inventory_item");
  });
  it("Empty e2e test", async () => {
    //open cart check url
    await browser.pause(100);
    shoppingCartPage.clickCartButton();
    await browser.pause(100);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain(URL + "cart.html");

    shoppingCartPage.clickCheckOut();
    await browser.pause(100);

    const afterClickButton = await browser.getUrl();
    expect(afterClickButton).toContain(currentUrl);
  });
});
