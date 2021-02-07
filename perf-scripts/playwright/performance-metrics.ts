import * as Playwright from "playwright";

const chrome = Playwright.chromium;
const webUrl = "https://microsoft.com";

async function performanceMetrics() {
  const browser: Playwright.ChromiumBrowser = await chrome.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(webUrl);

  const resourceTiming = await page.evaluate(() =>
    JSON.stringify(window.performance.getEntriesByType("resource"))
  );

  const scriptRespurcesTime = JSON.parse(resourceTiming).find((element: any) =>
    (element as any).initiatorType.includes("xmlhttprequest")
  );
  console.table(scriptRespurcesTime);
  await browser.close();
}

 performanceMetrics();
