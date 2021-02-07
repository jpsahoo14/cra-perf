import * as Puppeteer from "puppeteer";
import { Page } from "puppeteer/lib/cjs/puppeteer/common/Page";
import { Browser } from "puppeteer/lib/cjs/puppeteer/common/Browser";
import { PuppeteerNode } from "puppeteer/lib/cjs/puppeteer/node/Puppeteer";
import { CoverageEntry } from "puppeteer/lib/cjs/puppeteer/api-docs-entry";

const puppeteer: PuppeteerNode = Puppeteer.default;

const webUrl = "https://microsoft.com";

async function start() {
  const browser: Browser = await puppeteer.launch({ headless: false });
  const page: Page = await browser.newPage();
  await page.coverage.startJSCoverage();
  await page.goto(webUrl, {});
  const coverage: CoverageEntry[] = await page.coverage.stopJSCoverage();
  console.table(printResult(coverage));
  await browser.close();
}

function printResult(coverage: CoverageEntry[]) {
  return coverage.map(({ url, ranges, text }) => {
    let usedBytes = 0;

    ranges.forEach((range) => (usedBytes += range.end - range.start - 1));
    const totalBytes = text.length;
    const percentUsed = `${(
      ((text.length - usedBytes) / text.length) *
      100
    ).toFixed(2)}%`;
    url = url.substring(0, 20);
    return [url, totalBytes, usedBytes, percentUsed];
  });
}
start();
