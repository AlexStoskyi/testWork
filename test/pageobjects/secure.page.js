import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class getingValue extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $("#user-name");
  }

  get inputPassword() {
    return $("#password");
  }

  async takeVal() {
    await this.inputUsername.getElementValue();
    await this.inputPassword.getElementValue();
  }

}

export default new getingValue();
