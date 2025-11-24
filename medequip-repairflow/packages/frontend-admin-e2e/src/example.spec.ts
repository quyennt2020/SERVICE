import { test, expect } from '@playwright/test';

test('login and create ticket', async ({ page }) => {
  // 1. Login
  await page.goto('/login');
  await page.fill('input[type="email"]', 'admin@medequip.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button[type="submit"]');

  // Verify dashboard loaded
  await expect(page.locator('h1')).toContainText('Admin Dashboard');

  // 2. Navigate to Tickets
  await page.click('text=Tickets');
  await expect(page).toHaveURL(/\/tickets/);

  // 3. Create Ticket
  await page.click('text=New Ticket');
  await page.fill('#customer', '1'); // Assuming ID 1 exists from seed
  await page.fill('#equipment', '1'); // Assuming ID 1 exists from seed
  await page.selectOption('#priority', 'High');
  await page.fill('#problem', 'E2E Test Issue');
  await page.click('button:has-text("Create Ticket")');

  // 4. Verify Ticket in List
  // Wait for the modal to close and list to refresh
  await expect(page.locator('table')).toContainText('E2E Test Issue');
});
