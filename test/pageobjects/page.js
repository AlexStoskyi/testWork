import { browser } from "@wdio/globals";
const URL = process.env.URL;

export default class Page {
  /**
   * Opens a sub page of the page
   * @param path 
   */
  open(path) {
    return browser.url(URL);
  }
}
