/**
 * INSANE ANIMATIONS SYSTEM
 * Features: Mind-blowing GSAP animations, scroll triggers, interactive elements
 */

class AnimationSystem {
    constructor() {
        this.isInitialized = false;
        this.animationQueue = [];
        
        this.init();
    }
    
    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Set default ease for smooth animations
        gsap.defaults({ 
            ease: "power2.out",
            duration: 1.2
        });
        
        // Initialize animations
        this.initHeroAnimations();
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initFloatingCards();
        this.initCursorEffects();
        
        this.isInitialized = true;
    }
    
    initHeroAnimations() {
        // Hero name animation
        gsap.from("#hero-name", {
            duration: 2,
            y: 100,
            opacity: 0,
            scale: 0.5,
            rotation: 10,
            ease: "back.out(1.7)",
            delay: 0.5
        });
        
        // Tagline animation
        gsap.from("#tagline", {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: "power3.out",
            delay: 1
        });
        
        // Floating cards animation
        gsap.from(".floating-card", {
            duration: 1.5,
            y: 100,
            opacity: 0,
            scale: 0.8,
            rotation: 5,
            ease: "back.out(1.7)",
            stagger: 0.2,
            delay: 1.5
        });
    }
    
    initScrollAnimations() {
        // Section titles
        gsap.utils.toArray("h2").forEach((title, index) => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                duration: 1.5,
                y: 100,
                opacity: 0,
                scale: 0.8,
                rotation: 5,
                ease: "back.out(1.7)",
                delay: index * 0.1
            });
        });
        
        // Experience cards
        gsap.utils.toArray(".experience-card").forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play none none reverse"
                },
                duration: 1.2,
                x: index % 2 === 0 ? -100 : 100,
                opacity: 0,
                rotation: index % 2 === 0 ? -10 : 10,
                ease: "power3.out",
                delay: index * 0.2
            });
        });
        
        // Publication cards
        gsap.utils.toArray(".publication-card").forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                duration: 1.5,
                y: 100,
                opacity: 0,
                scale: 0.8,
                ease: "back.out(1.7)",
                delay: index * 0.1
            });
        });
        
        // Education cards
        gsap.utils.toArray(".education-card").forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play none none reverse"
                },
                duration: 1.2,
                y: 80,
                opacity: 0,
                rotation: index % 2 === 0 ? -5 : 5,
                ease: "power3.out",
                delay: index * 0.15
            });
        });
        
        // Contact links
        gsap.utils.toArray(".contact-link").forEach((link, index) => {
            gsap.from(link, {
                scrollTrigger: {
                    trigger: link,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                duration: 1,
                y: 50,
                opacity: 0,
                scale: 0.8,
                ease: "back.out(1.7)",
                delay: index * 0.1
            });
        });
    }
    
    initHoverEffects() {
        // Floating cards hover
        document.querySelectorAll('.floating-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.5,
                    y: -20,
                    scale: 1.05,
                    rotation: 0,
                    ease: "power2.out"
                });
                
                // Glow effect
                gsap.to(card, {
                    duration: 0.3,
                    boxShadow: "0 0 50px rgba(163, 163, 255, 0.5)",
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.5,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    ease: "power2.out"
                });
                
                // Remove glow
                gsap.to(card, {
                    duration: 0.3,
                    boxShadow: "0 0 20px rgba(163, 163, 255, 0.2)",
                    ease: "power2.out"
                });
            });
        });
        
        // Experience cards hover
        document.querySelectorAll('.experience-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.4,
                    y: -10,
                    scale: 1.02,
                    rotation: 0,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.4,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    ease: "power2.out"
                });
            });
        });
        
        // Contact links hover
        document.querySelectorAll('.contact-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1.1,
                    rotation: 5,
                    ease: "back.out(1.7)"
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1,
                    rotation: 0,
                    ease: "power2.out"
                });
            });
        });
    }
    
    initFloatingCards() {
        // Continuous floating animation
        document.querySelectorAll('.floating-card').forEach((card, index) => {
            gsap.to(card, {
                duration: 3 + index * 0.5,
                y: "+=20",
                rotation: "+=5",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 0.2
            });
        });
        
        // Experience cards floating
        document.querySelectorAll('.experience-card').forEach((card, index) => {
            gsap.to(card, {
                duration: 4 + index * 0.3,
                y: "+=15",
                rotation: "+=3",
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: index * 0.3
            });
        });
    }
    
    initCursorEffects() {
        // Custom cursor
        const cursor = document.getElementById('cursor');
        
        if (cursor) {
            // Follow mouse
            document.addEventListener('mousemove', (e) => {
                gsap.to(cursor, {
                    duration: 0.3,
                    x: e.clientX - 12,
                    y: e.clientY - 12,
                    ease: "power2.out"
                });
            });
            
            // Hover effects
            document.querySelectorAll('a, button, .floating-card, .experience-card').forEach(element => {
                element.addEventListener('mouseenter', () => {
                    gsap.to(cursor, {
                        duration: 0.3,
                        scale: 2,
                        backgroundColor: "#a3a3ff",
                        ease: "power2.out"
                    });
                });
                
                element.addEventListener('mouseleave', () => {
                    gsap.to(cursor, {
                        duration: 0.3,
                        scale: 1,
                        backgroundColor: "#a3a3ff",
                        ease: "power2.out"
                    });
                });
            });
        }
    }
    
    // Public methods
    pauseAnimations() {
        gsap.globalTimeline.pause();
    }
    
    resumeAnimations() {
        gsap.globalTimeline.resume();
    }
    
    addCustomAnimation(element, animation) {
        gsap.to(element, animation);
    }
}

// Initialize animation system
let animationSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    animationSystem = new AnimationSystem();
});

// Export for external use
window.AnimationSystem = AnimationSystem;