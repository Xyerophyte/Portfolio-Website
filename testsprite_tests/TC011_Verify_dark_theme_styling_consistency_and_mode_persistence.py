import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Check for dark mode toggle option on homepage and test toggling if available.
        await page.mouse.wheel(0, 300)
        

        frame = context.pages[-1]
        # Check if this is a dark mode toggle button
        elem = frame.locator('xpath=html/body/div/div[3]/div/div[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Scroll and search for any dark mode toggle button or switch elsewhere on the page.
        await page.mouse.wheel(0, 500)
        

        # -> Check navigation buttons at bottom (indexes 47-52) for possible dark mode toggle or theme settings.
        frame = context.pages[-1]
        # Click Skills button to check for dark mode toggle or theme settings
        elem = frame.locator('xpath=html/body/div/div[3]/div/div[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click next button near Skills to check for dark mode toggle or theme settings
        elem = frame.locator('xpath=html/body/div/div[3]/div/div[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Reload the page to verify if dark mode preference persists across sessions.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Check for any dark mode toggle or theme settings in the navigation or footer area.
        await page.mouse.wheel(0, 400)
        

        # -> Scroll further down to footer area to check for dark mode toggle or theme settings.
        await page.mouse.wheel(0, 600)
        

        # -> Check the top right corner icons (indexes 49-54) for any dark mode toggle or theme settings.
        frame = context.pages[-1]
        # Click home icon button to check for dark mode toggle or theme settings
        elem = frame.locator('xpath=html/body/div/div[3]/div/div').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Harsh Chavan').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full Stack Developer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Passionate developer with expertise in modern web technologies and a love for creating beautiful, functional applications.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=5+ Years Experience').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Available for Work').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Let's Connect').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Skills & Technologies').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Featured Projects').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Portfolio Website').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Email Template Pro').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Weather Dashboard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=E-Commerce Store').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Chat Application').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=API Gateway Service').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Blog CMS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Expense Tracker').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=URL Shortener').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Let\'s Work Together').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Send me a message').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=harshabasaheb1@gmail.com').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+971 502808641').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Available Mon-Fri, 9 AM - 6 PM GST').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Dubai, United Arab Emirates').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Open to remote work worldwide').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    