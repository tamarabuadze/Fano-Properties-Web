import { test, expect } from "@playwright/test";

let UNIQUE: string;
let FULL_NAME: string;
const FIRST_NAME = "TestAgent";

test.describe("Agents CRUD", () => {
  test.beforeAll(async () => {
    UNIQUE = `E2E-${Date.now()}`;
    FULL_NAME = `${FIRST_NAME} ${UNIQUE}`;
  });

  test("list page loads", async ({ page }) => {
    await page.goto("/agents");
    await expect(page.getByRole("heading", { name: /agents/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /add agent/i })).toBeVisible();
  });

  test("create a new agent", async ({ page }) => {
    await page.goto("/agents/new");
    await page.waitForLoadState("networkidle");

    await page.locator('[name="firstName"]').fill(FIRST_NAME);
    await page.locator('[name="lastName"]').fill(UNIQUE);
    await page.locator('[name="email"]').fill(`testagent.${Date.now()}@example.com`);
    await page.locator('[name="phone"]').fill("+1 555 000 0001");
    await page.locator('[name="title"]').fill("Real Estate Agent");
    await page.locator('[name="specialization"]').fill("Residential");
    await page.locator('[name="bio"]').fill("A test agent created by E2E automation.");
    await page.locator('[name="licenseNumber"]').fill("RE-E2E-001");
    await page.locator('[name="yearsExperience"]').fill("3");

    await page.getByRole("button", { name: /create agent/i }).click();

    await page.waitForURL("**/agents", { timeout: 15_000 });
    await expect(page.getByText(FULL_NAME)).toBeVisible();
  });

  test("edit an existing agent", async ({ page }) => {
    await page.goto("/agents");

    const row = page.locator("tr", { hasText: FULL_NAME });
    await row.getByRole("link", { name: /edit/i }).click();

    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: /edit agent/i })).toBeVisible();

    const titleInput = page.locator('[name="title"]');
    await titleInput.clear();
    await titleInput.fill("Senior Test Agent");

    await page.getByRole("button", { name: /update agent/i }).click();

    await page.waitForURL("**/agents", { timeout: 15_000 });
    await expect(page.getByText(FULL_NAME)).toBeVisible();
  });

  test("toggle agent active status", async ({ page }) => {
    await page.goto("/agents");

    const row = page.locator("tr", { hasText: FULL_NAME });
    const toggleBtn = row.getByRole("button", { name: /deactivate|activate/i });
    const initialLabel = await toggleBtn.getAttribute("aria-label");
    await toggleBtn.click();

    await page.waitForResponse((r) => r.status() === 200);
    await expect(toggleBtn).not.toHaveAttribute("aria-label", initialLabel ?? "");
  });

  test("delete the test agent", async ({ page }) => {
    await page.goto("/agents");

    const row = page.locator("tr", { hasText: FULL_NAME });
    page.on("dialog", (dialog) => dialog.accept());
    await row.getByRole("button", { name: /delete/i }).click();

    await expect(page.getByText(FULL_NAME)).not.toBeVisible({ timeout: 8_000 });
  });
});
