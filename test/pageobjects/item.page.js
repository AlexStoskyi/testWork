import { $ } from "@wdio/globals";

class itemsPage {
  get burgerButton() {
    return $("#react-burger-menu-btn");
  }
  get logoutButton() {
    return $("#logout_sidebar_link");
  }
  get dropdown() {
    return $(".select_container");
  }
  get dropdownLoHi() {
    return $('option[value="lohi"]');
  }
  get dropdownHiLo() {
    return $('option[value="hilo"]');
  }
  get dropdownAz() {
    return $('option[value="az"]');
  }
  get dropdownZa() {
    return $('option[value="za"]');
  }
  get footer() {
    return $(".footer");
  }
  get twitterButton() {
    return $('[href="https://twitter.com/saucelabs"]');
  }
  get facebookButton() {
    return $('[href="https://www.facebook.com/saucelabs"]');
  }
  get linkedinButton() {
    return $('[href="https://www.linkedin.com/company/sauce-labs/"]');
  }
  get addProductButton() {
    return $("#add-to-cart-sauce-labs-backpack");
  }

  async clickAddProduct() {
    (await this.addProductButton).click();
  }
  async clickTwitter() {
    (await this.twitterButton).click();
  }
  async clickFacebook() {
    (await this.facebookButton).click();
  }
  async clickLinkedin() {
    (await this.linkedinButton).click();
  }
  async scrollToFooter() {
    await this.footer.scrollIntoView();
  }
  async clickLogOut() {
    await this.logoutButton.click();
  }
  async clickBurgerButton() {
    await this.burgerButton.click();
  }
  async clickLogOutButton() {
    await this.logoutButton.click();
  }
  async clickHiLo() {
    await this.dropdownHiLo.click();
  }
  async clickLoHi() {
    await this.dropdownLoHi.click();
  }
  async clickZa() {
    await this.dropdownZa.click();
  }
  async clickAz() {
    await this.dropdownAz.click();
  }

  async dropdownButton() {
    await this.dropdown.click();
  }

  //   open() {
  //     return super.open("dropdownButton");
  //   }
  //   openDrop() {
  //     return super.open("clickBurgerButton");
  //   }
}

export default new itemsPage();
