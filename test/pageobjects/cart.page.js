import { $ } from "@wdio/globals";

class shoppingCartPage {
  get productList() {
    return $(".inventory_item");
  }
  get addButton() {
    return $("#add-to-cart-sauce-labs-backpack");
  }
  get catrBadge() {
    return $(".shopping_cart_badge");
  }
  get ShoppingCart() {
    return $("#shopping_cart_container");
  }
  get cartContents() {
    return $$("#cart_contents_container");
  }
  get checkoutButton() {
    return $("#checkout");
  }
  get firstName() {
    return $("#first-name");
  }
  get lastName() {
    return $("#last-name");
  }
  get zipCode() {
    return $("#postal-code");
  }
  get continueBut() {
    return $("#continue");
  }
  get finishButton() {
    return $("#finish");
  }
  get backHomeButton() {
    return $("#back-to-products");
  }

  async clickBackHomeButton() {
    (await this.backHomeButton).click();
  }
  async clickFinish() {
    (await this.finishButton).click();
  }

  async personInfo(username, password, zip) {
    await this.firstName.setValue(username);
    await this.lastName.setValue(password);
    await this.zipCode.setValue(zip);
    await this.continueBut.click();
  }

  async clickCheckOut() {
    (await this.checkoutButton).click();
  }

  async clickCartButton() {
    (await this.ShoppingCart).click();
  }
  async clickAddButton() {
    (await this.addButton).click();
  }
  async getTextBadge() {
    (await this.catrBadge).getText();
  }
}

export default new shoppingCartPage();
