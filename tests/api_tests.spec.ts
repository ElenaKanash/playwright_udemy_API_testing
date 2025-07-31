import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.route('https://conduit-api.bondaracademy.com/api/tags',
    async route => {
      const tags = {
    "tags": [
        "Tag_1",
        "Tag_2",
        "Tag_3",
        "Tag_4"
    ]
}
      await route.fulfill({
        body: JSON.stringify(tags)
      });      
    });    

  await page.goto('https://conduit.bondaracademy.com/');
  await page.waitForTimeout(500) 
});

test('has title', async ({ page }) => {  
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
});
