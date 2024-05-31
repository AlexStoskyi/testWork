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
  get twitterBut() {
    return $('[href="https://twitter.com/saucelabs"]');
  }
  get facebookBut() {
    return $('[href="https://www.facebook.com/saucelabs"]');
  }
  get linkedinBut() {
    return $('[href="https://www.linkedin.com/company/sauce-labs/"]');
  }
  get addProductBut() {
    return $("#add-to-cart-sauce-labs-backpack");
  }


  async clickAddProduct() {
    (await this.addProductBut).click();
  }
  async clickTwitter() {
    (await this.twitterBut).click();
  }
  async clickFacebook() {
    (await this.facebookBut).click();
  }
  async clickLinkedin() {
    (await this.linkedinBut).click();
  }
  async scrollToFooter() {
    await this.footer.scrollIntoView();
  }
  async clickLogOut() {
    await this.logoutButton.click();
  }
  async clickBurButt() {
    await this.burgerButton.click();
  }
  async clickLogOutButt() {
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

  async dropdownBut() {
    await this.dropdown.click();
  }
  async;

  open() {
    return super.open("dropdownBut");
  }
  openDrop() {
    return super.open("clickBurButt");
  }
}

export default new itemsPage();
