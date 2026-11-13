import { test, expect } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

test.describe("Authentication", () => {
  test("redirects unauthenticated users to /login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("shows error on invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(/email/i).fill("wrong@example.com");
    await page.getByLabel(/password/i).fill("wrongpassword");
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page.getByText(/invalid email or password/i)).toBeVisible({ timeout: 8_000 });
  });

  test("logs in with valid credentials and redirects to dashboard", async ({ page }) => {
    test.skip(!email || !password, "ADMIN_EMAIL/ADMIN_PASSWORD not set");
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(/email/i).fill(email!);
    await page.getByLabel(/password/i).fill(password!);
    await page.getByRole("button", { name: /sign in/i }).click();

    await page.waitForURL("**/dashboard", { timeout: 15_000 });
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("redirects logged-in users away from /login", async ({ page }) => {
    test.skip(!email || !password, "ADMIN_EMAIL/ADMIN_PASSWORD not set");
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(/email/i).fill(email!);
    await page.getByLabel(/password/i).fill(password!);
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForURL("**/dashboard", { timeout: 15_000 });

    await page.goto("/login");
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
