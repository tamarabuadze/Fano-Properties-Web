import { test, expect } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

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
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(/email/i).fill(process.env.ADMIN_EMAIL ?? "admin@fano.com");
    await page.getByLabel(/password/i).fill(process.env.ADMIN_PASSWORD ?? "admin123");
    await page.getByRole("button", { name: /sign in/i }).click();

    await page.waitForURL("**/dashboard", { timeout: 15_000 });
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("redirects logged-in users away from /login", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(/email/i).fill(process.env.ADMIN_EMAIL ?? "admin@fano.com");
    await page.getByLabel(/password/i).fill(process.env.ADMIN_PASSWORD ?? "admin123");
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForURL("**/dashboard", { timeout: 15_000 });

    await page.goto("/login");
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
