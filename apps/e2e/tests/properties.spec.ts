import { test, expect } from "@playwright/test";

let UNIQUE: string;
let PROPERTY_TITLE: string;
let EDITED_TITLE: string;

test.describe("Properties CRUD", () => {
  test.beforeAll(async () => {
    UNIQUE = `E2E-${Date.now()}`;
    PROPERTY_TITLE = `Test Villa ${UNIQUE}`;
    EDITED_TITLE = `${PROPERTY_TITLE} (Edited)`;
  });

  test("list page loads", async ({ page }) => {
    await page.goto("/properties");
    await expect(page.getByRole("heading", { name: /properties/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /add property/i })).toBeVisible();
  });

  test("create a new property", async ({ page }) => {
    await page.goto("/properties/new");
    await page.waitForLoadState("networkidle");

    await page.locator('[name="title"]').fill(PROPERTY_TITLE);
    await page.locator('textarea[name="description"]').fill("A beautiful test property created by E2E automation.");
    await page.locator('[name="propertyType"]').selectOption("villa");
    await page.locator('[name="listingType"]').selectOption("sale");
    await page.locator('[name="status"]').selectOption("available");

    await page.locator('[name="price"]').fill("500000");
    await page.locator('[name="currency"]').selectOption("USD");
    await page.locator('[name="bedrooms"]').fill("4");
    await page.locator('[name="bathrooms"]').fill("3");
    await page.locator('[name="sqft"]').fill("2800");

    await page.locator('[name="location"]').fill("456 Palm Drive, Beverly Hills");
    await page.locator('[name="city"]').fill("Beverly Hills");
    await page.locator('[name="state"]').fill("CA");
    await page.locator('[name="country"]').fill("US");

    await page.locator('[name="coverImage"]').fill(
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
    );

    await page.getByRole("button", { name: /create property/i }).click();

    await page.waitForURL("**/properties", { timeout: 15_000 });
    await expect(page.getByText(PROPERTY_TITLE)).toBeVisible();
  });

  test("edit an existing property", async ({ page }) => {
    await page.goto("/properties");

    const row = page.locator("tr", { hasText: PROPERTY_TITLE });
    await row.getByRole("link", { name: /edit/i }).click();

    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: /edit property/i })).toBeVisible();

    const titleInput = page.locator('[name="title"]');
    await titleInput.clear();
    await titleInput.fill(EDITED_TITLE);

    await page.getByRole("button", { name: /update property/i }).click();

    await page.waitForURL("**/properties", { timeout: 15_000 });
    await expect(page.getByText(EDITED_TITLE)).toBeVisible();
  });

  test("toggle property published status", async ({ page }) => {
    await page.goto("/properties");

    const row = page.locator("tr", { hasText: EDITED_TITLE });
    const toggleBtn = row.getByRole("button", { name: /publish|unpublish/i });
    const initialLabel = await toggleBtn.getAttribute("aria-label");
    await toggleBtn.click();

    await page.waitForResponse((r) => r.status() === 200);
    await expect(toggleBtn).not.toHaveAttribute("aria-label", initialLabel ?? "");
  });

  test("toggle property featured status", async ({ page }) => {
    await page.goto("/properties");

    const row = page.locator("tr", { hasText: EDITED_TITLE });
    const featuredBtn = row.getByRole("button", { name: /feature|unfeature/i });
    const initialLabel = await featuredBtn.getAttribute("aria-label");
    await featuredBtn.click();

    await page.waitForResponse((r) => r.status() === 200);
    await expect(featuredBtn).not.toHaveAttribute("aria-label", initialLabel ?? "");
  });

  test("delete the test property", async ({ page }) => {
    await page.goto("/properties");

    const row = page.locator("tr", { hasText: EDITED_TITLE });
    page.on("dialog", (dialog) => dialog.accept());
    await row.getByRole("button", { name: /delete/i }).click();

    await expect(page.getByText(EDITED_TITLE)).not.toBeVisible({ timeout: 8_000 });
  });
});
