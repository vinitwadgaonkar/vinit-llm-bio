/**
 * Vinit Wadgaonkar - AI/LLM Bio Page
 * Clean, professional JavaScript for essential functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    updateCurrentYear();
    injectJSONLDSchema();
    addSmoothScrolling();
    addLoadingStates();
});

/**
 * Update current year in footer
 */
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Inject JSON-LD structured data for SEO and rich snippets
 */
function injectJSONLDSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Vinit Wadgaonkar",
        "jobTitle": "AI/LLM Safety Researcher",
        "description": "AI/LLM Safety Researcher specializing in adversarial robustness, multilingual toxicity detection, and secure AI infrastructure.",
        "url": "https://vinitwadgaonkar.github.io/vinit-llm-bio/",
        "image": "https://vinitwadgaonkar.github.io/vinit-llm-bio/assets/hero.svg",
        "email": "vinitwadgaonkar@buffalo.edu",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Buffalo",
            "addressRegion": "NY",
            "addressCountry": "US"
        },
        "alumniOf": [
            {
                "@type": "EducationalOrganization",
                "name": "SUNY Buffalo",
                "description": "Master of Science in Computer Science"
            },
            {
                "@type": "EducationalOrganization", 
                "name": "Pune University",
                "description": "Bachelor of Engineering in Computer Science"
            }
        ],
        "worksFor": {
            "@type": "Organization",
            "name": "SUNY Buffalo",
            "description": "Research Assistant"
        },
        "knowsAbout": [
            "Artificial Intelligence",
            "Large Language Models",
            "AI Safety",
            "Adversarial Robustness",
            "Multilingual Processing",
            "Toxicity Detection",
            "Machine Learning",
            "Computer Security"
        ],
        "sameAs": [
            "https://github.com/vinitwadgaonkar",
            "https://linkedin.com/in/vinitwadgaonkar"
        ]
    };

    // Create and inject script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

/**
 * Initialize smooth scrolling for anchor links
 */
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add loading states and performance optimizations
 */
function addLoadingStates() {
    // Add loading class to hero image
    const heroImage = document.querySelector('img[src="assets/hero.svg"]');
    if (heroImage) {
        heroImage.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        heroImage.addEventListener('error', function() {
            console.warn('Hero image failed to load');
        });
    }
    
    // Optimize images for performance
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
}

/**
 * Utility function to load resume data dynamically (optional)
 */
async function loadResumeData() {
    try {
        const response = await fetch('data/resume.json');
        if (!response.ok) {
            throw new Error('Failed to load resume data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn('Could not load resume data:', error);
        return null;
    }
}

/**
 * Add keyboard navigation support
 */
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Skip to main content with Alt + M
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            const main = document.querySelector('main');
            if (main) {
                main.focus();
                main.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Skip to footer with Alt + F
        if (e.altKey && e.key === 'f') {
            e.preventDefault();
            const footer = document.querySelector('footer');
            if (footer) {
                footer.focus();
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

/**
 * Performance monitoring
 */
function addPerformanceMonitoring() {
    // Basic performance logging
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

/**
 * Error handling
 */
function addErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

// Initialize additional features if needed
// addKeyboardNavigation();
// addPerformanceMonitoring();
// addErrorHandling();

// Export functions for potential external use
window.VinitBio = {
    loadResumeData,
    updateCurrentYear,
    injectJSONLDSchema
};