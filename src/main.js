import './style.css'

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('OIR FC Website - Initializing...')
    initializeNavigation()
    initializeTabFunctionality() // This will handle the fixtures tabs
    initializeFormHandling()
    initializeSectionReveal();
    initializeGalleryCarousel();
    initializeMobileOptimizations();
    initializeBackToTop();
    initializeStore();
    
    console.log('OIR FC Website - Initialization complete!')
})

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('#mobile-menu')
    const navLinks = document.querySelector('#navbar-menu')
    const navbar = document.querySelector('.navbar')

    // Mobile menu toggle
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            navLinks.classList.toggle('active')
            mobileMenuBtn.classList.toggle('active')
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = ''
            }
        })
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active')
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active')
            document.body.style.overflow = ''
        }
    })

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active')
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active')
            document.body.style.overflow = ''
        }
    })

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled')
            } else {
                navbar.classList.remove('scrolled')
            }
        }
    })

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            const targetId = this.getAttribute('href')
            const target = document.querySelector(targetId)
            if (target) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active')
                    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active')
                    document.body.style.overflow = ''
                }
                
                // Smooth scroll to target
                const navbarHeight = navbar ? navbar.offsetHeight : 70
                const targetPosition = target.offsetTop - navbarHeight
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })
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

function initializeSectionReveal() {
    const sections = document.querySelectorAll('section');
    const fadeCards = () => {
        // Animate cards in news and team sections
        document.querySelectorAll('.news-card, .team-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92) {
                card.classList.add('sr-visible');
            }
        });
    };
    const reveal = () => {
        const trigger = window.innerHeight * 0.92;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < trigger) {
                section.classList.add('sr-visible');
            }
        });
        fadeCards();
    };
    window.addEventListener('scroll', reveal, { passive: true });
    reveal();
}

function initializeGalleryCarousel() {
    // Add all your gallery images here (example: photo1.jpg to photo30.jpg)
    const images = Array.from({ length: 30 }, (_, i) => `/gallery/photo${i + 1}.jpg`);
    const track = document.getElementById('gallery-carousel-track');
    if (!track) return;

    // Render images
    track.innerHTML = images.map(src =>
        `<div class="gallery-tile"><img src="${src}" alt="OIR FC Gallery" loading="lazy"></div>`
    ).join('');

    // Carousel navigation
    const prevBtn = document.querySelector('.carousel-btn--prev');
    const nextBtn = document.querySelector('.carousel-btn--next');
    let scrollAmount = 0;
    const tileWidth = track.querySelector('.gallery-tile')?.offsetWidth || 260;
    const gap = parseInt(getComputedStyle(track).gap) || 16;

    function scrollCarousel(direction) {
        const visibleTiles = Math.floor(track.offsetWidth / (tileWidth + gap));
        const maxScroll = (tileWidth + gap) * (images.length - visibleTiles);
        scrollAmount += direction * (tileWidth + gap);
        if (scrollAmount < 0) scrollAmount = 0;
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
        track.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }

    if (prevBtn) prevBtn.onclick = () => scrollCarousel(-1);
    if (nextBtn) nextBtn.onclick = () => scrollCarousel(1);
}

// Mobile-specific utilities
function initializeMobileOptimizations() {
    console.log('Initializing mobile optimizations...')
    
    // Add touch-friendly interactions
    addTouchFriendlyInteractions()
    
    // Handle orientation changes
    handleOrientationChange()
    
    // Optimize scroll performance
    optimizeScrollPerformance()
    
    // Add mobile-specific accessibility improvements
    addMobileAccessibility()
}

function addTouchFriendlyInteractions() {
    // Simplified mobile team card flip interaction
    const teamCards = document.querySelectorAll('.team-card')
    teamCards.forEach(card => {
        // Simple click handler for mobile and desktop
        card.addEventListener('click', function() {
            // Toggle flipped state
            this.classList.toggle('flipped')
        })
        
        // Add touch feedback for better mobile experience
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active')
        }, { passive: true })
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active')
            }, 150)
        }, { passive: true })
    })
    
    // Improve mobile tab interactions
    const tabBtns = document.querySelectorAll('.tab-btn')
    tabBtns.forEach(btn => {
        btn.addEventListener('touchend', function(e) {
            e.preventDefault()
            this.click()
        })
    })
}

function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        // Recalculate layout after orientation change
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 100)
    })
}

function optimizeScrollPerformance() {
    // Use passive event listeners for better scroll performance
    let ticking = false
    
    function updateScrollElements() {
        const navbar = document.querySelector('.navbar')
        const backToTopBtn = document.getElementById('back-to-top')
        
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled')
            } else {
                navbar.classList.remove('scrolled')
            }
        }
        
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex'
            } else {
                backToTopBtn.style.display = 'none'
            }
        }
        
        ticking = false
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements)
            ticking = true
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true })
}

function addMobileAccessibility() {
    // Improve focus management for mobile
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')
    
    // Add touch feedback for interactive elements
    focusableElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7'
        }, { passive: true })
        
        element.addEventListener('touchend', function() {
            this.style.opacity = ''
        }, { passive: true })
    })
    
    // Ensure mobile menu is accessible
    const mobileMenuBtn = document.querySelector('#mobile-menu')
    const navMenu = document.querySelector('#navbar-menu')
    
    if (mobileMenuBtn && navMenu) {
        // Add ARIA attributes for accessibility
        mobileMenuBtn.setAttribute('aria-expanded', 'false')
        mobileMenuBtn.setAttribute('aria-controls', 'navbar-menu')
        navMenu.setAttribute('aria-hidden', 'true')
        
        // Update ARIA attributes when menu state changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isActive = navMenu.classList.contains('active')
                    mobileMenuBtn.setAttribute('aria-expanded', isActive.toString())
                    navMenu.setAttribute('aria-hidden', (!isActive).toString())
                }
            })
        })
        
        observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] })
    }
}

// Enhanced back to top functionality
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top')
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        })
        
        // Add keyboard support
        backToTopBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }
        })
    }
}

window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
document.getElementById('back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Store products initialization
function initializeStore() {
    const storeGrid = document.getElementById('store-grid');
    if (!storeGrid) return;

    const products = [        {
            id: 'home-kit',
            title: 'OIR FC Home Kit 2025',
            category: 'Apparel',
            description: 'Official home kit featuring our iconic red jersey with premium quality fabric and modern fit.',
            price: '£45.00',
            originalPrice: '£55.00',
            image: '/products/home-kit-2025.jpg',
            badge: 'New',
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'away-kit',
            title: 'OIR FC Away Kit 2025',
            category: 'Apparel',
            description: 'Sleek away kit in navy blue with gold accents. Perfect for training and matches.',
            price: '£42.00',
            originalPrice: null,
            image: '/products/away-kit-2025.jpg',
            badge: null,
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'water-bottle',
            title: 'OIR FC Water Bottle',
            category: 'Accessories',
            description: 'Premium insulated water bottle with club logo. Keeps drinks cold for up to 12 hours.',
            price: '£15.00',
            originalPrice: null,
            image: '/products/water-bottle.jpg',
            badge: 'Popular',
            sizes: null
        },        {
            id: 'hoodie',
            title: 'Club Hoodie',
            category: 'Apparel',
            description: 'Comfortable cotton blend hoodie featuring embroidered club crest and colors.',
            price: '£38.00',
            originalPrice: null,
            image: '/products/club-hoodie.jpg',
            badge: null,
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        },
        {
            id: 'scarf',
            title: 'Supporters Scarf',
            category: 'Accessories',
            description: 'Classic knitted scarf in club colors. Perfect for match days and cold weather.',
            price: '£18.00',
            originalPrice: '£22.00',
            image: '/products/supporter-scarf.jpg',
            badge: 'Sale',
            sizes: null
        },        {
            id: 'cap',
            title: 'Club Cap',
            category: 'Accessories',
            description: 'Adjustable baseball cap with embroidered logo. One size fits all.',
            price: '£12.00',
            originalPrice: null,
            image: '/products/club-cap.jpg',
            badge: null,
            sizes: null
        },
    ];

    // Generate product cards HTML
    const productCards = products.map(product => {
        const badge = product.badge ? `<div class="product-card__badge">${product.badge}</div>` : '';
        const originalPrice = product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : '';
        const sizes = product.sizes ? `<div class="product-card__sizes">${product.sizes.map(size => `<span class="size-option" data-size="${size}">${size}</span>`).join('')}</div>` : '';

        return `
            <div class="product-card" data-product-id="${product.id}">
                ${badge}
                <div class="product-card__image">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                </div>
                <div class="product-card__content">
                    <div class="product-card__category">${product.category}</div>
                    <h3 class="product-card__title">${product.title}</h3>
                    <p class="product-card__description">${product.description}</p>
                    ${sizes}
                    <div class="product-card__footer">
                        <div class="product-card__price">
                            ${originalPrice}${product.price}
                        </div>
                        <button class="product-card__btn" onclick="addToCart('${product.id}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    storeGrid.innerHTML = productCards;

    // Add size selection functionality
    addSizeSelectionHandlers();
}

// Size selection handlers
function addSizeSelectionHandlers() {
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from siblings
            const siblings = this.parentElement.querySelectorAll('.size-option');
            siblings.forEach(sibling => sibling.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
}

// Placeholder for add to cart functionality
function addToCart(productId) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const selectedSize = productCard.querySelector('.size-option.selected');
    const productTitle = productCard.querySelector('.product-card__title').textContent;
    
    let message = `${productTitle} added to cart!`;
    if (selectedSize) {
        message = `${productTitle} (Size: ${selectedSize.dataset.size}) added to cart!`;
    }
    
    // Simple alert for now - in a real app this would integrate with a cart system
    alert(message);
    
    // Add visual feedback
    const button = productCard.querySelector('.product-card__btn');
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1500);
}

// Make addToCart globally available
window.addToCart = addToCart;
