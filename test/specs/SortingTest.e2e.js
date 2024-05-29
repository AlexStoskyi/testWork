import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";

xdescribe("Sorting", () => {
  let prices;
  let sortedByName;
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");

    const foo = await $$("#inventory_container")[0];
    prices = await foo
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));

    const too = await $$("#inventory_container")[0];
    sortedByName = await too
      .$$(".inventory_item_name")
      .map(async (name) => await name.getText());
  });

  it("Sort by low to hight", async () => {
    const sortedPrice = prices.sort((a, b) => a - b);
    console.log(sortedPrice);

    const dropdown = await $(".select_container");
    await dropdown.click();
    const option = await dropdown.$('option[value="lohi"]');
    await option.click();

    const foof = await $$("#inventory_container")[0];

    const afterPrice = await foof
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));
    console.log(afterPrice);

    let areEqual = true;

    if (prices.length !== afterPrice.length) {
      areEqual = false;
    } else {
      for (let i = 0; i < prices.length; i++) {
        if (prices[i] !== afterPrice[i]) {
          areEqual = false;
          break;
        }
      }
    }

    if (areEqual) {
      console.log(
        `Кожен елемент масиву A дорівнює відповідному елементу масиву B`
      );
    } else {
      console.log(
        `Не всі елементи масиву A дорівнюють відповідним елементам масиву B`
      );
    }
  });

  it("Sort by hight to low", async () => {
    const sortedPrice = prices.sort((a, b) => b - a);
    console.log(sortedPrice);

    const dropdown = await $(".select_container");
    await dropdown.click();
    const option = await dropdown.$('option[value="hilo"]');
    await option.click();

    const foof = await $$("#inventory_container")[0];

    const afterPrice = await foof
      .$$(".inventory_item_price")
      .map(async (price) => (await price.getText()).replace("$", ""));
    console.log(afterPrice);

    let areEqual = true;

    for (let i = 0; i < prices.length; i++) {
      if (prices[i] !== afterPrice[i]) {
        areEqual = false;
        break;
      }
    }

    if (areEqual) {
      console.log(
        `Кожен елемент масиву A дорівнює відповідному елементу масиву B`
      );
    } else {
      console.log(
        `Не всі елементи масиву A дорівнюють відповідним елементам масиву B`
      );
    }
  });

  it("Sort by Name(A to Z)", async () => {
    const sortedName = sortedByName.sort((a, b) => a - b);
    console.log(sortedName);

    const dropdown = await $(".select_container");
    await dropdown.click();
    const option = await dropdown.$('option[value="az"]');
    await option.click();

    const too = await $$("#inventory_container")[0];

    const afterChangeByName = await too
      .$$(".inventory_item_name")
      .map(async (name) => (await name.getText()).replace("$", ""));
    console.log(afterChangeByName);

    let areEqual = true;

    for (let i = 0; i < sortedName.length; i++) {
      if (sortedName[i] !== afterChangeByName[i]) {
        areEqual = false;
        break;
      }
    }

    if (areEqual) {
      console.log(
        `Кожен елемент масиву A дорівнює відповідному елементу масиву B`
      );
    } else {
      console.log(
        `Не всі елементи масиву A дорівнюють відповідним елементам масиву B`
      );
    }
  });

  it("Sort by Name(Z to A)", async () => {
    const sortedName = sortedByName.reverse();
    console.log(sortedName);

    const dropdown = await $(".select_container");
    await dropdown.click();
    const option = await dropdown.$('option[value="za"]');
    await option.click();

    const too = await $$("#inventory_container")[0];

    const afterChangeByName = await too
      .$$(".inventory_item_name")
      .map(async (name) => await name.getText());
    console.log(afterChangeByName);

    let areEqual = true;

    for (let i = 0; i < sortedName.length; i++) {
      if (sortedName[i] !== afterChangeByName[i]) {
        areEqual = false;
        break;
      }
    }

    if (areEqual) {
      console.log(
        `Кожен елемент масиву A дорівнює відповідному елементу масиву B`
      );
    } else {
      console.log(
        `Не всі елементи масиву A дорівнюють відповідним елементам масиву B`
      );
    }
  });
});