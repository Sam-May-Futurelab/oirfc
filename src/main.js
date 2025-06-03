import './style.css'

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('OIR FC Website - Initializing...')
    
    initializeNavigation()
    initializeTabFunctionality() // This will handle the fixtures tabs
    initializeFormHandling()
    
    console.log('OIR FC Website - Initialization complete!')
})

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('#mobile-menu')
    const navLinks = document.querySelector('#navbar-menu')

    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active')
            mobileMenuBtn.classList.toggle('active')
        })
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const targetId = this.getAttribute('href')
            const target = document.querySelector(targetId)
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active')
                    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active')
                }
            }
        })
    })
}

// Tab functionality - this is crucial for fixtures tables
function initializeTabFunctionality() {
    console.log('Setting up tab functionality...')
    
    // Find all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn')
    console.log('Found tab buttons:', tabButtons.length)

    tabButtons.forEach((tab, index) => {
        console.log(`Tab ${index}: ${tab.textContent.trim()} - data-tab: ${tab.dataset.tab}`)
        
        tab.addEventListener('click', (e) => {
            e.preventDefault()
            const targetTab = tab.dataset.tab
            console.log('Tab clicked:', targetTab)
            
            // Find the parent section to scope the tab switching
            const parentSection = tab.closest('section')
            if (!parentSection) {
                console.error('No parent section found for tab')
                return
            }

            // Update active tab button
            const sectionTabs = parentSection.querySelectorAll('.tab-btn')
            sectionTabs.forEach(t => t.classList.remove('active'))
            tab.classList.add('active')

            // Update active content
            const sectionContents = parentSection.querySelectorAll('.tab-content')
            console.log('Found tab contents in section:', sectionContents.length)
            
            sectionContents.forEach(content => {
                content.classList.remove('active')
            })
            
            // Find and activate target content
            const targetContent = parentSection.querySelector(`#${targetTab}`)
            if (targetContent) {
                targetContent.classList.add('active')
                console.log('Activated content:', targetTab)
            } else {
                console.error(`Content #${targetTab} not found`)
            }
        })
    })

    // Also check the fixtures section specifically
    const fixturesSection = document.querySelector('#fixtures')
    if (fixturesSection) {
        console.log('Fixtures section found')
        const upcomingContent = fixturesSection.querySelector('#upcoming')
        const resultsContent = fixturesSection.querySelector('#results')
        console.log('Upcoming content:', upcomingContent ? 'found' : 'not found')
        console.log('Results content:', resultsContent ? 'found' : 'not found')
        
        // Make sure upcoming tab is active by default
        const upcomingTab = fixturesSection.querySelector('[data-tab="upcoming"]')
        if (upcomingTab && upcomingContent) {
            upcomingTab.classList.add('active')
            upcomingContent.classList.add('active')
        }
    }
}

// Form handling
function initializeFormHandling() {
    // Contact form
    const contactForm = document.querySelector('#contact-form')
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault()
            alert('Thank you for your message! We will get back to you soon.')
            contactForm.reset()
        })
    }

    // Newsletter form
    const newsletterForm = document.querySelector('#newsletter-form')
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault()
            alert('Thank you for subscribing to our newsletter!')
            newsletterForm.reset()
        })
    }

    // Join form
    const joinForm = document.querySelector('#join-form')
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault()
            alert('Thank you for your interest in joining OIR FC!')
            joinForm.reset()
        })
    }
}
