import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check title
    await expect(page).toHaveTitle(/itshopping/)
    
    // Check main content is visible
    await expect(page.locator('main')).toBeVisible()
  })

  test('should display navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check navigation is visible
    await expect(page.locator('header')).toBeVisible()
  })

  test('should display hero section', async ({ page }) => {
    await page.goto('/')
    
    // Check hero section exists
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
  })
})

test.describe('Products', () => {
  test('should display products list', async ({ page }) => {
    await page.goto('/')
    
    // Wait for products to load
    await page.waitForTimeout(2000)
    
    // Check products section exists
    const productsSection = page.locator('#programs')
    await expect(productsSection).toBeVisible()
  })
})

test.describe('Categories', () => {
  test('should navigate to category page', async ({ page }) => {
    await page.goto('/')
    
    // Click on a category
    await page.click('a[href="/categories/mobile"]')
    
    // Check category page loaded
    await expect(page).toHaveURL(/categories\/mobile/)
  })
})

test.describe('Authentication', () => {
  test('should open login modal', async ({ page }) => {
    await page.goto('/')
    
    // Click login button
    const loginButton = page.locator('button:has-text("Kirish")')
    if (await loginButton.isVisible()) {
      await loginButton.click()
      
      // Check modal is open
      const modal = page.locator('[role="dialog"]')
      await expect(modal).toBeVisible()
    }
  })
})

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/')
    
    // Click logo
    await page.click('a[aria-label="ITSHOPPING bosh sahifa"]')
    
    // Check home page loaded
    await expect(page).toHaveURL('/')
  })
})

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check page loads
    await expect(page.locator('main')).toBeVisible()
  })

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    // Check page loads
    await expect(page.locator('main')).toBeVisible()
  })

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    
    // Check page loads
    await expect(page.locator('main')).toBeVisible()
  })
})
