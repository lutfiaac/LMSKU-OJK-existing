import { chromium } from "@playwright/test";
import fs from "node:fs";
fs.mkdirSync("evidence", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
for (const [name, path] of [
  ["home", "/"],
  ["login", "/Login"],
  ["dashboard", "/Dashboard"],
]) {
  try {
    await page.goto("https://lmsku.ojk.go.id" + path, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    await page.screenshot({
      path: `evidence/source-${name}.png`,
      fullPage: true,
    });
    console.log(
      JSON.stringify({
        name,
        url: page.url(),
        title: await page.title(),
        text: (await page.locator("body").innerText()).slice(0, 250),
      }),
    );
  } catch (e) {
    console.log(name + ": " + e.message);
  }
}
await browser.close();
