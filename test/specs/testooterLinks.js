import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import { describe } from "mocha";

xdescribe("My Login application", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
  });

  it("Check clickable of Footer Links(Twiter)", async () => {
    const footer = await $(".footer");
    await footer.scrollIntoView();
    const twitterBut = await $('[href="https://twitter.com/saucelabs"]');
    await twitterBut.click();

    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);

    await expect(browser).toHaveUrl("https://x.com/saucelabs");
    // await expect(currentUrl).toContain("https://x.com/saucelabs");
  });

  it("Check clickable of Footer Links()", async () => {
    const footer = await $(".footer");
    await footer.scrollIntoView();
    const twitterBut = await $('[href="https://www.facebook.com/saucelabs"]');
    await twitterBut.click();

    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);

    await expect(browser).toHaveUrl("https://www.facebook.com/saucelabs");
  });

  it.only("Check clickable of Footer Links()", async () => {
    const footer = await $(".footer");
    await footer.scrollIntoView();
    const twitterBut = await $(
      '[href="https://www.linkedin.com/company/sauce-labs/"]'
    );
    await twitterBut.click();

    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);

    await expect(browser).toHaveUrl(
      "https://www.linkedin.com/company/sauce-labs/"
    );
  });
});
