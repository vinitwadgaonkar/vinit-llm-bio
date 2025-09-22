/**
 * Vinit Wadgaonkar - AI/LLM Bio Page
 * JavaScript for dynamic features and JSON-LD schema injection
 */

// AI Consciousness Stream
class AIConsciousnessStream {
    constructor() {
        this.thoughts = [
            "Analyzing neural network architectures...",
            "Processing quantum entanglement patterns...",
            "Evaluating reinforcement learning policies...",
            "Computing multidimensional consciousness metrics...",
            "Synthesizing AI safety protocols...",
            "Optimizing transformer attention mechanisms...",
            "Calculating quantum coherence levels...",
            "Mapping neural pathway connections...",
            "Simulating consciousness emergence...",
            "Processing linguistic understanding...",
            "Evaluating adversarial robustness...",
            "Computing scaling laws for AI systems...",
            "Analyzing multilingual toxicity detection...",
            "Processing human feedback loops...",
            "Synthesizing ethical AI frameworks..."
        ];
        
        this.currentThought = "";
        this.thoughtIndex = 0;
        this.charIndex = 0;
        this.isTyping = false;
        this.thoughtsPerSecond = 0;
        this.aiIQ = 0;
        this.aiDimensions = 11;
        
        this.init();
    }
    
    init() {
        this.startThinking();
        this.updateMetrics();
    }
    
    startThinking() {
        const thinkingElement = document.getElementById('ai-thinking');
        const thoughtsPerSecElement = document.getElementById('thoughts-per-sec');
        const aiIQElement = document.getElementById('ai-iq');
        const aiDimensionsElement = document.getElementById('ai-dimensions');
        
        if (!thinkingElement) return;
        
        const think = () => {
            if (!this.isTyping) {
                this.currentThought = this.thoughts[this.thoughtIndex];
                this.charIndex = 0;
                this.isTyping = true;
                this.thoughtIndex = (this.thoughtIndex + 1) % this.thoughts.length;
            }
            
            if (this.isTyping && this.charIndex < this.currentThought.length) {
                thinkingElement.textContent = this.currentThought.substring(0, this.charIndex + 1) + "▋";
                this.charIndex++;
                
                // Random typing speed
                const delay = Math.random() * 50 + 30;
                setTimeout(think, delay);
            } else if (this.isTyping) {
                this.isTyping = false;
                this.thoughtsPerSecond++;
                
                // Wait before next thought
                setTimeout(think, 2000 + Math.random() * 3000);
            } else {
                setTimeout(think, 100);
            }
            
            // Update metrics
            if (thoughtsPerSecElement) {
                thoughtsPerSecElement.textContent = this.thoughtsPerSecond;
            }
            
            if (aiIQElement) {
                this.aiIQ = Math.min(999999, this.aiIQ + Math.random() * 1000);
                aiIQElement.textContent = Math.floor(this.aiIQ).toLocaleString();
            }
            
            if (aiDimensionsElement) {
                this.aiDimensions = 11 + Math.sin(Date.now() * 0.001) * 0.5;
                aiDimensionsElement.textContent = this.aiDimensions.toFixed(1);
            }
        };
        
        think();
    }
    
    updateMetrics() {
        setInterval(() => {
            // Update thoughts per second
            this.thoughtsPerSecond = Math.max(0, this.thoughtsPerSecond - 0.1);
        }, 1000);
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    updateCurrentYear();
    injectJSONLDSchema();
    addCardHoverEffects();
    initializeSmoothScrolling();
    addLoadingStates();
    
    // Initialize AI Consciousness Stream
    new AIConsciousnessStream();
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
 * Add hover effects to cards
 */
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.bg-zinc-900');
    
    cards.forEach(card => {
        card.classList.add('card-hover');
        
        // Add focus support for keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Could add click functionality here if needed
            }
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
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
        heroImage.classList.add('hero-loading');
        
        heroImage.addEventListener('load', function() {
            this.classList.remove('hero-loading');
        });
        
        heroImage.addEventListener('error', function() {
            this.classList.remove('hero-loading');
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
 * Add intersection observer for scroll animations (optional enhancement)
 */
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
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
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would require the web-vitals library
        // getCLS(console.log);
        // getFID(console.log);
        // getFCP(console.log);
        // getLCP(console.log);
        // getTTFB(console.log);
    }
    
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
        // Could send to analytics service here
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        // Could send to analytics service here
    });
}

// Initialize additional features if needed
// addScrollAnimations();
// addKeyboardNavigation();
// addPerformanceMonitoring();
// addErrorHandling();

// Export functions for potential external use
window.VinitBio = {
    loadResumeData,
    updateCurrentYear,
    injectJSONLDSchema
};
