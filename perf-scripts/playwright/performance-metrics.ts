import * as Playwright from "playwright";

const chrome = Playwright.chromium;
const webUrl = "https://microsoft.com";

async function performanceMetrics() {
  const browser = await chrome.launch({ headless: false });
  const page = await browser.newPage();

  await browser.close();
}


performanceMetrics();
