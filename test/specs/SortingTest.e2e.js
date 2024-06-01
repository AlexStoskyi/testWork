import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";

xdescribe("Sorting items", () => {
  let prices;
  let sortedByName;

  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");

    const containerItems = await $$("#inventory_container")[0];
    prices = await containerItems
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));

    const too = await $$("#inventory_container")[0];
    sortedByName = await too
      .$$(".inventory_item_name")
      .map(async (name) => await name.getText());
  });

  it("Sort by low to hight", async () => {
    const sortedPrice = prices.sort((a, b) => a - b);
    await itemPage.dropdownBut();
    await itemPage.clickLoHi();
    const foof = await $$("#inventory_container")[0];
    const afterPrice = await foof
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));
    await expect(afterPrice).toEqual(sortedPrice);
  });

  it("Sort by hight to low", async () => {
    const sortedPrice = prices.sort((a, b) => b - a);
    await itemPage.dropdownBut();
    await itemPage.clickHiLo();
    const foof = await $$("#inventory_container")[0];
    const afterPrice = await foof
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));
    await expect(afterPrice).toEqual(sortedPrice);
  });

  it("Sort by Name(A to Z)", async () => {
    const sortedName = sortedByName.sort((a, b) => a - b);
    await itemPage.dropdownBut();
    await itemPage.clickAz();
    const too = await $$("#inventory_container")[0];
    const afterChangeByName = await too
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    await expect(afterChangeByName).toEqual(sortedName);
  });

  it("Sort by Name(Z to A)", async () => {
    const sortedName = sortedByName.reverse();
    await itemPage.dropdownBut();
    await itemPage.clickZa();
    const too = await $$("#inventory_container")[0];
    const afterChangeByName = await too
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    await expect(afterChangeByName).toEqual(sortedName);
  });
});
