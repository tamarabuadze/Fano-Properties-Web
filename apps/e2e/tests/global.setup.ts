import { test as setup, expect } from "@playwright/test";
import path from "path";

const sessionFile = path.join(__dirname, "../.auth/session.json");

setup("authenticate as admin", async ({ page }) => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD (the plaintext for ADMIN_PASSWORD_HASH) before running e2e, e.g. in apps/e2e/.env.local"
    );
  }

  await page.goto("/login");
  await page.waitForLoadState("networkidle");

  // login form now has htmlFor/id so getByLabel works
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole("button", { name: /sign in/i }).click();

  await page.waitForURL("**/dashboard", { timeout: 15_000 });
  await expect(page).toHaveURL(/\/dashboard/);

  await page.context().storageState({ path: sessionFile });
});
