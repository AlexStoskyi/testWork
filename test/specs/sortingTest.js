import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";

const USER_LOGIN = process.env.USER_NAME;
const USER_PASSWORD = process.env.PASSWORD;
describe("Sorting items", () => {
  let sortedByPrice;
  let sortedByName;
  beforeEach(async () => {
    loginPage.open();
    await loginPage.login(USER_LOGIN, USER_PASSWORD);

    const containerItems = await $$("#inventory_container")[0];
    itemsPrice = await containerItems
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));

    // const getItemListInformation = $$("#inventory_container")[0];
    itemsName = await containerItems
      .$$(".inventory_item_name")
      .map(async (name) => await name.getText());
  });

  it("Sort by low to hight", async () => {
    const sortedPriceAsc = itemsPrice.sort((a, b) => a - b);
    itemPage.dropdownButton();
    itemPage.clickLoHi();
    const getItemListInformation = $$("#inventory_container")[0];
    const afterSortByPrice = await getItemListInformation
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));
    expect(afterSortByPrice).toEqual(sortedPriceAsc);
  });

  it("Sort by hight to low", async () => {
    const sortedPriceDesc = itemsPrice.sort((a, b) => b - a);
    itemPage.dropdownButton();
    itemPage.clickHiLo();
    const getItemListInformation = $$("#inventory_container")[0];
    const afterSortByPrice = await getItemListInformation
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));
    await expect(afterSortByPrice).toEqual(sortedPriceDesc);
  });

  it("Sort by Name(A to Z)", async () => {
    const sortedNameAsc = itemsName.sort((a, b) => a - b);
    itemPage.dropdownButton();
    itemPage.clickAz();
    const getItemListInformation = $$("#inventory_container")[0];
    const afterSortByName = await getItemListInformation
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    expect(afterSortByName).toEqual(sortedNameAsc);
  });

  it("Sort by Name(Z to A)", async () => {
    const sortedNameDesc = itemsName.reverse();
    itemPage.dropdownButton();
    itemPage.clickZa();
    const getItemListInformation = $$("#inventory_container")[0];
    const afterSortByName = await getItemListInformation
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    expect(afterSortByName).toEqual(sortedNameDesc);
  });
});
