import { test as setup, expect } from "@playwright/test";
import path from "path";

const sessionFile = path.join(__dirname, "../.auth/session.json");

setup("authenticate as admin", async ({ page }) => {
  await page.goto("/login");
  await page.waitForLoadState("networkidle");

  // login form now has htmlFor/id so getByLabel works
  await page.getByLabel(/email/i).fill(process.env.ADMIN_EMAIL ?? "admin@fano.com");
  await page.getByLabel(/password/i).fill(process.env.ADMIN_PASSWORD ?? "admin123");
  await page.getByRole("button", { name: /sign in/i }).click();

  await page.waitForURL("**/dashboard", { timeout: 15_000 });
  await expect(page).toHaveURL(/\/dashboard/);

  await page.context().storageState({ path: sessionFile });
});
