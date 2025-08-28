import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json';

test.beforeEach(async ({ page }) => {
  //modify tags
  await page.route('*/**/api/tags', async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });

  //modify body
  await page.route('*/**/api/articles*', async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();

    responseBody.articles[0].title = 'Mock test title';
    responseBody.articles[0].description = 'Mock test description';

    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });

  await page.goto('https://conduit.bondaracademy.com/');
  await page.waitForTimeout(1000);
});

test('Modify tags', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
});

test('Modify body', async ({ page }) => {
  await expect(page.locator('app-article-list h1').first()).toHaveText('Mock test title');
  await expect(page.locator('app-article-list p').first()).toHaveText('Mock test description');
});
