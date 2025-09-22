/**
 * CRAZY Animations and Scroll Effects for Vinit's Bio Page
 * Features: GSAP animations, scroll triggers, parallax, glitch effects, interactive elements
 */

class AnimationController {
    constructor() {
        this.init();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupGlitchEffects();
        this.setupParticleSystem();
        this.setupInteractiveElements();
    }
    
    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Set default ease
        gsap.defaults({ ease: "power2.out" });
        
        // Initial page load animation
        this.initialLoadAnimation();
    }
    
    initialLoadAnimation() {
        // Hero section entrance
        const tl = gsap.timeline();
        
        tl.from("h1", {
            duration: 1.5,
            y: 100,
            opacity: 0,
            rotationX: 90,
            transformOrigin: "bottom",
            ease: "back.out(1.7)"
        })
        .from(".text-xl", {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2
        }, "-=1")
        .from("a", {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: "bounce.out"
        }, "-=0.5")
        .from("#hero-3d", {
            duration: 2,
            scale: 0,
            rotation: 360,
            opacity: 0,
            ease: "elastic.out(1, 0.3)"
        }, "-=1.5");
    }
    
    setupScrollAnimations() {
        // Section titles animation
        gsap.utils.toArray(".section-title").forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                duration: 1,
                y: 100,
                opacity: 0,
                rotationX: 45,
                transformOrigin: "bottom",
                ease: "power3.out"
            });
        });
        
        // Focus cards animation
        gsap.utils.toArray(".focus-card").forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                duration: 1.2,
                y: 150,
                opacity: 0,
                rotation: 15,
                scale: 0.8,
                delay: index * 0.2,
                ease: "back.out(1.7)"
            });
            
            // Hover animation
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1.05,
                    rotationY: 5,
                    z: 20,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.card-icon'), {
                    duration: 0.5,
                    rotation: 360,
                    scale: 1.2,
                    ease: "back.out(1.7)"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    scale: 1,
                    rotationY: 0,
                    z: 0,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.card-icon'), {
                    duration: 0.3,
                    rotation: 0,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });
        
        // Experience cards animation
        gsap.utils.toArray(".bg-zinc-900").forEach((card, index) => {
            if (card.classList.contains('focus-card')) return; // Skip focus cards
            
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                duration: 1,
                x: index % 2 === 0 ? -100 : 100,
                opacity: 0,
                rotationY: index % 2 === 0 ? -45 : 45,
                ease: "power3.out"
            });
        });
        
        // Parallax effect for background elements
        gsap.to("#three-canvas", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            y: -200,
            ease: "none"
        });
    }
    
    setupHoverEffects() {
        // Link hover effects
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1.1,
                    color: "#a3a3ff",
                    textShadow: "0 0 10px #a3a3ff",
                    ease: "power2.out"
                });
            });
            
            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1,
                    color: "",
                    textShadow: "",
                    ease: "power2.out"
                });
            });
        });
        
        // Text hover effects
        document.querySelectorAll('h1, h2, h3').forEach(heading => {
            heading.addEventListener('mouseenter', () => {
                gsap.to(heading, {
                    duration: 0.5,
                    scale: 1.05,
                    textShadow: "0 0 20px #a3a3ff",
                    ease: "elastic.out(1, 0.3)"
                });
            });
            
            heading.addEventListener('mouseleave', () => {
                gsap.to(heading, {
                    duration: 0.3,
                    scale: 1,
                    textShadow: "",
                    ease: "power2.out"
                });
            });
        });
    }
    
    setupGlitchEffects() {
        // Random glitch effects on text
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                this.triggerTextGlitch();
            }
        }, 3000);
        
        // Glitch effect on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            if (Math.random() < 0.3) { // 30% chance on scroll
                this.triggerScrollGlitch();
            }
            scrollTimeout = setTimeout(() => {}, 100);
        });
    }
    
    triggerTextGlitch() {
        const headings = document.querySelectorAll('h1, h2, h3');
        const randomHeading = headings[Math.floor(Math.random() * headings.length)];
        
        const originalText = randomHeading.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        // Create glitch effect
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                let glitchText = '';
                for (let j = 0; j < originalText.length; j++) {
                    if (Math.random() < 0.3) {
                        glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitchText += originalText[j];
                    }
                }
                randomHeading.textContent = glitchText;
            }, i * 50);
        }
        
        setTimeout(() => {
            randomHeading.textContent = originalText;
        }, 300);
    }
    
    triggerScrollGlitch() {
        const glitchOverlay = document.getElementById('glitch-overlay');
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];
        
        gsap.to(glitchOverlay, {
            duration: 0.1,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            opacity: 0.1,
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut"
        });
    }
    
    setupParticleSystem() {
        // Create floating particles
        const particleContainer = document.getElementById('particles');
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: #a3a3ff;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                pointer-events: none;
            `;
            
            particleContainer.appendChild(particle);
            
            // Animate particle
            gsap.to(particle, {
                duration: Math.random() * 10 + 5,
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                rotation: 360,
                repeat: -1,
                ease: "none"
            });
            
            // Mouse interaction
            document.addEventListener('mousemove', (e) => {
                const rect = particle.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(e.clientX - rect.left, 2) + 
                    Math.pow(e.clientY - rect.top, 2)
                );
                
                if (distance < 100) {
                    gsap.to(particle, {
                        duration: 0.3,
                        scale: 2,
                        opacity: 1,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(particle, {
                        duration: 0.3,
                        scale: 1,
                        opacity: Math.random() * 0.5 + 0.2,
                        ease: "power2.out"
                    });
                }
            });
        }
    }
    
    setupInteractiveElements() {
        // Cursor trail effect
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #a3a3ff, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                duration: 0.3,
                x: e.clientX - 10,
                y: e.clientY - 10,
                ease: "power2.out"
            });
        });
        
        // Click explosion effect
        document.addEventListener('click', (e) => {
            const explosion = document.createElement('div');
            explosion.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 10px;
                height: 10px;
                background: #a3a3ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
            `;
            document.body.appendChild(explosion);
            
            gsap.to(explosion, {
                duration: 0.5,
                scale: 20,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => explosion.remove()
            });
        });
        
        // Keyboard interaction
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ') { // Spacebar
                e.preventDefault();
                this.triggerSpacebarEffect();
            }
        });
    }
    
    triggerSpacebarEffect() {
        // Create wave effect
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            width: 0;
            height: 0;
            border: 2px solid #a3a3ff;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(wave);
        
        gsap.to(wave, {
            duration: 1,
            width: 1000,
            height: 1000,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => wave.remove()
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});
