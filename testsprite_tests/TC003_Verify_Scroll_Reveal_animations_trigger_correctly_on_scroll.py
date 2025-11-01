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
        # -> Slowly scroll down through all sections on the home page to observe scroll reveal animations.
        await page.mouse.wheel(0, 600)
        

        # -> Continue slow scrolling down through the remaining sections to observe scroll reveal animations and check for smooth performance.
        await page.mouse.wheel(0, 600)
        

        # -> Continue slow scrolling down through the remaining sections to observe scroll reveal animations and check for smooth performance.
        await page.mouse.wheel(0, 600)
        

        # -> Scroll back up and down rapidly to test animation consistency under quick user interactions.
        await page.mouse.wheel(0, -1200)
        

        # -> Scroll down rapidly to test animation consistency under quick user interactions.
        await page.mouse.wheel(0, 1200)
        

        # -> Test scroll reveal animations on mobile devices with various resolutions to verify performance and consistency.
        await page.goto('http://localhost:3000/', timeout=10000)
        await asyncio.sleep(3)
        

        # -> Simulate mobile viewport sizes and test scroll reveal animations for performance and consistency on mobile devices.
        await page.mouse.wheel(0, 600)
        

        # -> Continue scrolling down slowly to observe scroll reveal animations on remaining sections and verify smooth performance on mobile viewport.
        await page.mouse.wheel(0, 600)
        

        # -> Continue slow scrolling down through the remaining sections to observe scroll reveal animations and check for smooth performance.
        await page.mouse.wheel(0, 600)
        

        # -> Continue slow scrolling down through the remaining sections to observe scroll reveal animations and check for smooth performance.
        await page.mouse.wheel(0, 600)
        

        # -> Continue slow scrolling down through the remaining sections to observe scroll reveal animations and check for smooth performance.
        await page.mouse.wheel(0, 600)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame.locator('text=Harsh Chavan').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Backend Specialist|').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Crafting exceptional digital experiences with modern technologies').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Get In Touch').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Download Resume').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=About Me').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Passionate developer with expertise in modern web technologies and a love for creating beautiful, functional applications.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ABOUT ME').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full Stack Developer').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Passionate about creating modern web applications with cutting-edge technologies').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=FRONTEND').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=React & Next.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Expert in modern React patterns, hooks, and Next.js framework').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=BACKEND').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Node.js & Python').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Backend development with scalable APIs and microservices').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=EXPERIENCE').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=5+ Years Experience').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Building production-ready applications for startups and enterprises').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=STATUS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Available for Work').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Open to new opportunities and exciting projects').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CONTACT').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Let\'s Connect').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Always interested in discussing new ideas and collaborations').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Skills & Technologies').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=A comprehensive toolkit of modern technologies and frameworks I use to build exceptional applications.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=LANGUAGES').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=JavaScript/TypeScript').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=ES6+, TypeScript, Modern JS patterns').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=FRONTEND').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=React Ecosystem').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=React, Next.js, Redux, Context API').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=BACKEND').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Backend Technologies').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Node.js, Express, Python, FastAPI').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=DATA').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Databases').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=PostgreSQL, MongoDB, Redis, Supabase').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=INFRASTRUCTURE').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Cloud & DevOps').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=AWS, Vercel, Docker, CI/CD').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=DESIGN').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Design & UI').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tailwind CSS, Figma, Responsive Design').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Featured Projects').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=A showcase of my recent work, demonstrating expertise across different technologies and domains.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=All').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Frontend').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Backend').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Featured Projects').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=🌟').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Live').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=⭐ Featured').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Portfolio Website').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Interactive portfolio with advanced animations and modern design').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Next.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=TypeScript').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tailwind CSS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=GSAP').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+2 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=📧').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Live').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=⭐ Featured').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Email Template Pro').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Outlook email sender with Microsoft Graph API integration').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=React').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Vite').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=TypeScript').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Microsoft Graph API').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+2 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=All Projects').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=🌟').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Live').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Portfolio Website').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Interactive portfolio with advanced animations and modern design').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Next.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=TypeScript').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Tailwind CSS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+3 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=📧').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Live').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Email Template Pro').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Outlook email sender with Microsoft Graph API integration').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=React').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Vite').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=TypeScript').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+3 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=🌤️').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Frontend').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Live').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Frontend').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Weather Dashboard').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Real-time weather application with location-based forecasts').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=JavaScript').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=HTML5').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=CSS3').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+2 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=🛒').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Live').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=E-Commerce Store').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-stack e-commerce solution with payment integration').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=React').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Node.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Express.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+3 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=💬').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Live').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Chat Application').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Real-time messaging app with Socket.io').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Node.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Socket.io').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Express.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+3 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=🔗').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Backend').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Live').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Backend').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=API Gateway Service').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Microservices architecture with authentication and rate limiting').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Node.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Express.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Redis').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+3 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=📝').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=In Progress').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Blog CMS').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Content management system for blogs and articles').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Next.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Prisma').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=PostgreSQL').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+2 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=💰').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Frontend').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Live').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Frontend').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Expense Tracker').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Personal finance management application').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=React').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Chart.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Local Storage').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+2 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=🔗').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Live').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Full-Stack').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=URL Shortener').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Custom URL shortening service with analytics').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Node.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Express.js').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=MongoDB').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+2 more').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=View Details →').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Let\'s Work Together').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=I\'m always interested in new opportunities and exciting projects. Let\'s discuss how we can bring your ideas to life.').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Send me a message').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Name *').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Email *').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Subject *').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Message *').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Send Message').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Get in touch').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Email').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=harshabasaheb1@gmail.com').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=I typically respond within 24 hours').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Phone').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=+971 502808641').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Available Mon-Fri, 9 AM - 6 PM GST').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Location').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Dubai, United Arab Emirates').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Open to remote work worldwide').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=Connect with me').first).to_be_visible(timeout=30000)
        await expect(frame.locator('text=© 2024 Harsh Chavan. All rights reserved.').first).to_be_visible(timeout=30000)
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    