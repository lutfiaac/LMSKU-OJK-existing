import { chromium, expect } from "@playwright/test";
import fs from "node:fs";
fs.mkdirSync("evidence", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const base = "http://127.0.0.1:4173";
for (const [name, path] of [
  ["dashboard", "/Dashboard"],
  ["category", "/Course/show/16/acs"],
  ["activities", "/Activity/show/47"],
  ["detail", "/Activity/detail"],
]) {
  await page.setViewportSize({
    width: 1920,
    height: { dashboard: 7505, category: 1728, activities: 2601, detail: 1743 }[
      name
    ],
  });
  await page.goto(base + path);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `evidence/local-${name}.png`, fullPage: true });
  console.log(
    name,
    await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      images: [...document.images]
        .filter((i) => !i.complete || i.naturalWidth === 0)
        .map((i) => i.src),
    })),
  );
}
await expect(
  page.getByText("Tidak tersedia, kecuali:", { exact: false }),
).toBeVisible();
await page.getByRole("button", { name: "Kembali", exact: true }).click();
await page.getByRole("button", { name: "Post-test", exact: true }).click();
await expect(page.locator(".locked-alert")).toContainText("seluruh materi");
await page.getByRole("button", { name: "Kembali", exact: true }).click();
await page.getByRole("button", { name: "Pre-test", exact: true }).click();
await page.getByRole("button", { name: "Mulai Pre-test" }).click();
for (const [i, j] of [
  [0, 0],
  [1, 1],
  [2, 2],
])
  await page.locator(`input[name="question-${i}"]`).nth(j).check();
await page.getByRole("button", { name: "Kirim Jawaban" }).click();
await expect(page.getByText("100/100")).toBeVisible();
await page.getByRole("button", { name: "Kembali ke Aktivitas" }).click();
for (let i = 0; i < 10; i++) {
  await page.locator(".material-grid .activity-tile").nth(i).click();
  await expect(page.locator(".locked-alert")).toHaveCount(0);
  await page.getByRole("button", { name: "Tandai Selesai" }).click();
}
await page.getByRole("button", { name: "Post-test", exact: true }).click();
await page.getByRole("button", { name: "Mulai Post-test" }).click();
for (const [i, j] of [
  [0, 0],
  [1, 1],
  [2, 2],
])
  await page.locator(`input[name="question-${i}"]`).nth(j).check();
await page.getByRole("button", { name: "Kirim Jawaban" }).click();
await expect(page.getByText("100/100")).toBeVisible();
await page.getByRole("button", { name: "Dashboard", exact: true }).click();
await page.getByRole("textbox", { name: "Cari modul" }).fill("Syariah");
await expect(page.locator(".available-section .module-card")).toHaveCount(1);
await page.getByRole("textbox", { name: "Cari modul" }).fill("tidakada");
await expect(page.locator(".empty-state")).toBeVisible();
await page.getByRole("button", { name: "Hapus pencarian" }).click();
await expect(page.locator(".available-section .module-card")).toHaveCount(16);
await page.getByLabel("Urutkan modul").selectOption("za");
await expect(
  page.locator(".available-section .module-card").first(),
).toContainText("Perusahaan Pembiayaan");
await page.getByRole("button", { name: "Forum Diskusi Anda Aktif" }).click();
await page.getByLabel("Pesan diskusi").fill("Selamat belajar!");
await page.getByRole("button", { name: "Kirim pesan" }).click();
await expect(page.locator(".chat-message")).toContainText("Selamat belajar!");
await page.getByRole("button", { name: "Tutup forum" }).click();
await page.getByRole("button", { name: "Edit profil" }).click();
await page
  .getByRole("textbox", { name: "Nama", exact: true })
  .fill("Peserta Demo");
await page.getByRole("button", { name: "Simpan", exact: true }).click();
await expect(page.locator(".welcome h1")).toContainText("Peserta Demo");
await page.setViewportSize({ width: 390, height: 844 });
for (const [name, path] of [
  ["dashboard", "/Dashboard"],
  ["category", "/Course/show/16/acs"],
  ["activities", "/Activity/show/47"],
  ["detail", "/Activity/detail"],
]) {
  await page.goto(base + path);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `evidence/mobile-${name}.png`,
    fullPage: true,
  });
  const w = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(w).toBeLessThanOrEqual(390);
}
await page.goto(base + "/Dashboard");
await page
  .locator(".accessed")
  .getByRole("button", { name: "Buka Modul Keuangan Syariah", exact: true })
  .click();
await expect(page.locator("h1")).toHaveText("Kategori Modul Keuangan Syariah");
await page
  .getByRole("button", { name: "Keuangan Syariah Basic", exact: true })
  .click();
await page.locator(".material-grid .activity-tile").first().click();
await expect(page.locator(".locked-alert")).toBeVisible();
await page.goBack();
await expect(page.locator("h1")).toHaveText("Keuangan Syariah Basic");
for (const width of [320, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const path of [
    "/Dashboard",
    "/Course/show/16/acs",
    "/Activity/show/47",
    "/Activity/detail",
  ]) {
    await page.goto(base + path);
    const w = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(w, `overflow at ${width} ${path}`).toBeLessThanOrEqual(width);
  }
}
await page.goto(base + "/Course/show/16/acs");
await page.getByRole("button", { name: "Ubah Foto" }).click();
await page
  .getByRole("button", { name: "Pilih foto female", exact: true })
  .click();
await expect(page.locator(".profile-panel .student")).toHaveAttribute(
  "src",
  "/assets/female.png",
);
await page.getByRole("button", { name: "Notifikasi", exact: true }).click();
await expect(page.locator(".header-menu")).toContainText("Selamat datang");
await page.keyboard.press("Escape");
await expect(page.locator(".header-menu")).toHaveCount(0);
expect(errors).toEqual([]);
console.log(
  "PASS: learning sequence, locks, search, sort, forum, profile/photo, notifications, back navigation, 320/390/768/1024/1440/1920 widths; no page errors",
);
await browser.close();
