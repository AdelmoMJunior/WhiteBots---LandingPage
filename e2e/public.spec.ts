import {expect, test} from "@playwright/test";

test("public Portuguese landing renders core sections", async ({page}) => {
  await page.goto("/pt-BR");

  await expect(page.getByRole("heading", {name: /automação premium/i})).toBeVisible();
  await expect(page.getByRole("link", {name: /discord/i}).first()).toBeVisible();
  await expect(page.locator("#modules")).toBeVisible();
  await expect(page.locator("#faq")).toBeVisible();
});

test("English landing and language switch are available", async ({page}) => {
  await page.goto("/en");

  await expect(page.getByRole("heading", {name: /premium automation/i})).toBeVisible();
  await page.getByRole("link", {name: "PT"}).click();
  await expect(page).toHaveURL(/\/pt-BR/);
});

test("admin redirects anonymous users to login", async ({page}) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(page.getByRole("heading", {name: /whitebots/i})).toBeVisible();
});
