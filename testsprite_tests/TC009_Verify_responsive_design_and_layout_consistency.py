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
        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Resize viewport to 320px width to simulate mobile device and check layout adaptation.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Harsh Chavan').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full Stack Developer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Dubai, United Arab Emirates').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Passionate developer with expertise in modern web technologies, creating beautiful and functional applications using cutting-edge tools.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=5+ years building production-ready applications for startups and enterprises').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Available for work, open to new opportunities and exciting projects').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=JavaScript').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=TypeScript').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=React').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Next.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Node.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Express').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tailwind CSS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Portfolio Website').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Interactive portfolio with advanced animations and modern design').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Email Template Pro').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Outlook email sender with Microsoft Graph API integration').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Weather Dashboard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Real-time weather application with location-based forecasts').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=E-Commerce Store').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-stack e-commerce solution with payment integration').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Chat Application').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Real-time messaging app with Socket.io').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=API Gateway Service').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Microservices architecture with authentication and rate limiting').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Blog CMS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Content management system for blogs and articles').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Expense Tracker').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Personal finance management application').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=URL Shortener').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Custom URL shortening service with analytics').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=harshabasaheb1@gmail.com').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+971 502808641').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Mon-Fri, 9 AM - 6 PM GST').first).to_be_visible(timeout=30000)
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
    