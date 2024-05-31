import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import { describe } from "mocha";
import itemPage from "../pageobjects/item.page.js";

xdescribe("Check clickable of Link", () => {
  const xComLink = "https://x.com/saucelabs";
  const faceBookLink = "https://www.facebook.com/saucelabs";
  const LinkedinLink = "https://www.linkedin.com/company/sauce-labs/";
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
  });

  it("Check clickable of Footer Links(Twiter)", async () => {
    await itemPage.scrollToFooter();
    await itemPage.clickTwitter();
    await browser.pause(2000);
    await browser.switchWindow(xComLink);
    const curUrl = await browser.getUrl();
    expect(curUrl).toBe(xComLink);
  });

  it("Check clickable of Footer Links(Facebook)", async () => {
    await itemPage.scrollToFooter();
    await itemPage.clickFacebook();
    await browser.pause(2000);
    await browser.switchWindow(faceBookLink);
    const curUrl = await browser.getUrl();
    expect(curUrl).toBe(faceBookLink);
  });

  it("Check clickable of Footer Links(Linkedin)", async () => {
    await itemPage.scrollToFooter();
    await itemPage.clickLinkedin();
    await browser.pause(2000);
    await browser.switchWindow(LinkedinLink);
    const curUrl = await browser.getUrl();
    expect(curUrl).toBe(LinkedinLink);
  });
});
