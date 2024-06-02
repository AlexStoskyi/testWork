import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import itemPage from "../pageobjects/item.page.js";

const USER_LOGIN = process.env.USER_NAME;
const USER_PASSWORD = process.env.PASSWORD;
const X_LINK = process.env.X_LINK;
const FACE_LINK = process.env.FACE_LINK;
const LINKEDIN_LINK = process.env.LINKEDIN_LINK;

describe("Check clickable of Link", () => {
  beforeEach(async () => {
    await browser.pause(500);
    loginPage.open();
    await loginPage.login(USER_LOGIN, USER_PASSWORD);
  });

  it("Check clickable of Footer Links(Twiter)", async () => {
    itemPage.scrollToFooter();
    itemPage.clickTwitter();
    await browser.pause(200);
    await browser.switchWindow(X_LINK);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe(X_LINK);
  });

  it("Check clickable of Footer Links(Facebook)", async () => {
    itemPage.scrollToFooter();
    itemPage.clickFacebook();
    await browser.pause(200);
    await browser.switchWindow(FACE_LINK);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe(FACE_LINK);
  });

  it("Check clickable of Footer Links(Linkedin)", async () => {
    itemPage.scrollToFooter();
    itemPage.clickLinkedin();
    await browser.pause(200);
    await browser.switchWindow(LINKEDIN_LINK);
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe(LINKEDIN_LINK);
  });
});
