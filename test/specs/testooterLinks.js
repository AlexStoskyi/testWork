import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";

xdescribe("Check clickable of Link", () => {
  const xComLink = "https://x.com/saucelabs";
  const faceBookLink = "https://www.facebook.com/saucelabs";
  const linkedinLink = "https://www.linkedin.com/company/sauce-labs/";
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
  });

  it("Check clickable of Footer Links(Twiter)", async () => {
    await itemPage.scrollToFooter();
    await itemPage.clickTwitter();
    browser.pause(2000);
    browser.switchWindow(xComLink);
    const curUrl = await browser.getUrl();
    expect(curUrl).toBe(xComLink);
  });

  it("Check clickable of Footer Links(Facebook)", async () => {
    await itemPage.scrollToFooter();
    await itemPage.clickFacebook();
    browser.pause(2000);
    browser.switchWindow(faceBookLink);
    const curUrl = await browser.getUrl();
    expect(curUrl).toBe(faceBookLink);
  });

  it("Check clickable of Footer Links(Linkedin)", async () => {
    await itemPage.scrollToFooter();
    await itemPage.clickLinkedin();
    browser.pause(2000);
    browser.switchWindow(linkedinLink);
    const curUrl = await browser.getUrl();
    expect(curUrl).toBe(linkedinLink);
  });
});
