import * as Playwright from "playwright";

const chrome = Playwright.chromium;
const webUrl = "https://microsoft.com";

async function throttle() {
  const browser = await chrome.launch({ headless: false });
  const page = await browser.newPage();
  const client = await (page.context() as any).newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    downloadThroughput: (1 * 1024 * 1024) / 2,
    uploadThroughput: (3 * 1024 * 1024) / 8,
    latency: 20,
  });

  await page.goto(webUrl);

  await browser.close();
}

throttle();
