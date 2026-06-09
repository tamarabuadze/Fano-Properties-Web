import { test, expect } from "@playwright/test";

test.describe("Settings", () => {
  test("settings page loads with form fields", async ({ page }) => {
    await page.goto("/settings");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: /settings/i })).toBeVisible();
    await expect(page.locator('[name="siteName"]')).toBeVisible();
    await expect(page.locator('[name="siteTagline"]')).toBeVisible();
    await expect(page.locator('[name="contactEmail"]')).toBeVisible();
  });

  test("save button is disabled when form is pristine", async ({ page }) => {
    await page.goto("/settings");
    await page.waitForLoadState("networkidle");
    const saveBtn = page.getByRole("button", { name: /save settings/i });
    await expect(saveBtn).toBeDisabled();
  });

  test("save button enables after editing a field", async ({ page }) => {
    await page.goto("/settings");
    await page.waitForLoadState("networkidle");

    const siteNameInput = page.locator('[name="siteName"]');
    await siteNameInput.clear();
    await siteNameInput.fill("Fano Real Estate Updated");

    await expect(page.getByRole("button", { name: /save settings/i })).toBeEnabled();
  });

  test("saves settings and shows success toast", async ({ page }) => {
    await page.goto("/settings");
    await page.waitForLoadState("networkidle");

    // Use a unique tagline each run so the form is always dirty
    const uniqueTagline = `Find Your Dream Home ${Date.now()}`;
    await page.locator('[name="siteTagline"]').clear();
    await page.locator('[name="siteTagline"]').fill(uniqueTagline);

    await page.getByRole("button", { name: /save settings/i }).click();

    await expect(page.getByText(/settings saved/i)).toBeVisible({ timeout: 8_000 });
  });

  test("validates URL fields", async ({ page }) => {
    await page.goto("/settings");
    await page.waitForLoadState("networkidle");

    await page.locator('[name="instagramUrl"]').fill("not-a-valid-url");

    // Blur to trigger validation
    await page.locator('[name="instagramUrl"]').blur();

    await page.getByRole("button", { name: /save settings/i }).click();

    await expect(page.getByText(/must be a valid url/i)).toBeVisible({ timeout: 5_000 });
  });
});
