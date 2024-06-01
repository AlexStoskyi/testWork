import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";

const USER_LOGIN = process.env.USER_NAME;
const USER_PASSWORD = process.env.PASSWORD;
describe("Sorting items", () => {
  let prices;
  let sortedByName;
  beforeEach(async () => {
    loginPage.open();
    await loginPage.login(USER_LOGIN, USER_PASSWORD);

    const containerItems = await $$("#inventory_container")[0];
    prices = await containerItems
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));

    const too = $$("#inventory_container")[0];
    sortedByName = await too
      .$$(".inventory_item_name")
      .map(async (name) => await name.getText());
  });

  it("Sort by low to hight", async () => {
    const sortedPrice = prices.sort((a, b) => a - b);
    itemPage.dropdownBut();
    itemPage.clickLoHi();
    const foof = $$("#inventory_container")[0];
    const afterPrice = await foof
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));
    expect(afterPrice).toEqual(sortedPrice);
  });

  it("Sort by hight to low", async () => {
    const sortedPrice = prices.sort((a, b) => b - a);
    itemPage.dropdownBut();
    itemPage.clickHiLo();
    const foof = $$("#inventory_container")[0];
    const afterPrice = await foof
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));
    await expect(afterPrice).toEqual(sortedPrice);
  });

  it("Sort by Name(A to Z)", async () => {
    const sortedName = sortedByName.sort((a, b) => a - b);
    itemPage.dropdownBut();
    itemPage.clickAz();
    const too = $$("#inventory_container")[0];
    const afterChangeByName = await too
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    expect(afterChangeByName).toEqual(sortedName);
  });

  it("Sort by Name(Z to A)", async () => {
    const sortedName = sortedByName.reverse();
    itemPage.dropdownBut();
    itemPage.clickZa();
    const too = $$("#inventory_container")[0];
    const afterChangeByName = await too
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    expect(afterChangeByName).toEqual(sortedName);
  });
});
