/**
 * GOD-LEVEL Performance Animations & Scaling Visualizations
 * Features: Smooth GSAP animations, performance metrics, scaling visualizations
 */

class PerformanceAnimationSystem {
    constructor() {
        this.isInitialized = false;
        this.animationQueue = [];
        this.performanceMetrics = {
            fps: 60,
            memory: 0,
            gpu: 0,
            latency: 0
        };
        
        this.init();
    }
    
    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Set default ease for smooth animations
        gsap.defaults({ 
            ease: "power2.out",
            duration: 0.8
        });
        
        // Initialize performance monitoring
        this.initPerformanceMonitoring();
        
        // Initialize animations
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initScalingVisualizations();
        this.initTokenGeneration();
        
        this.isInitialized = true;
    }
    
    initPerformanceMonitoring() {
        // Monitor FPS
        let lastTime = performance.now();
        let frameCount = 0;
        
        const measureFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                this.performanceMetrics.fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        measureFPS();
        
        // Monitor memory usage
        if (performance.memory) {
            setInterval(() => {
                this.performanceMetrics.memory = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
            }, 1000);
        }
    }
    
    initScrollAnimations() {
        // Smooth scroll-triggered animations without flickering
        gsap.utils.toArray(".section-title").forEach((title, index) => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse",
                    scrub: false // Disable scrub to prevent flickering
                },
                duration: 1.2,
                y: 50,
                opacity: 0,
                ease: "back.out(1.7)",
                delay: index * 0.1
            });
        });
        
        // Focus cards with smooth entrance
        gsap.utils.toArray(".focus-card").forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "bottom 10%",
                    toggleActions: "play none none reverse"
                },
                duration: 1,
                y: 80,
                opacity: 0,
                rotationX: 15,
                ease: "power3.out",
                delay: index * 0.15
            });
            
            // Smooth hover effects
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.4,
                    y: -10,
                    scale: 1.02,
                    rotationX: 0,
                    rotationY: 2,
                    ease: "power2.out"
                });
                
                gsap.to(card.querySelector('.card-icon'), {
                    duration: 0.6,
                    rotation: 360,
                    scale: 1.2,
                    ease: "back.out(1.7)"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.4,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    rotationY: 0,
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
        
        // Experience cards with staggered animation
        gsap.utils.toArray(".bg-zinc-900").forEach((card, index) => {
            if (card.classList.contains('focus-card')) return;
            
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                },
                duration: 1.2,
                x: index % 2 === 0 ? -60 : 60,
                opacity: 0,
                ease: "power3.out",
                delay: index * 0.1
            });
        });
    }
    
    initHoverEffects() {
        // Smooth link hover effects
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    duration: 0.3,
                    scale: 1.05,
                    color: "#a3a3ff",
                    textShadow: "0 0 15px #a3a3ff",
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
        
        // Smooth heading hover effects
        document.querySelectorAll('h1, h2, h3').forEach(heading => {
            heading.addEventListener('mouseenter', () => {
                gsap.to(heading, {
                    duration: 0.5,
                    scale: 1.03,
                    textShadow: "0 0 25px #a3a3ff",
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
    
    initScalingVisualizations() {
        // Create scaling performance chart
        this.createScalingChart();
        
        // Create throughput visualization
        this.createThroughputVisualization();
    }
    
    createScalingChart() {
        const chartContainer = document.createElement('div');
        chartContainer.id = 'scaling-chart';
        chartContainer.style.cssText = `
            position: fixed;
            bottom: 4rem;
            right: 1rem;
            width: 250px;
            height: 120px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid #a3a3ff;
            border-radius: 8px;
            z-index: 30;
            padding: 10px;
        `;
        
        const canvas = document.createElement('canvas');
        canvas.width = 230;
        canvas.height = 100;
        canvas.style.cssText = 'width: 100%; height: 100%;';
        chartContainer.appendChild(canvas);
        
        const title = document.createElement('div');
        title.textContent = 'Model Scaling Performance';
        title.style.cssText = 'color: #a3a3ff; font-size: 12px; margin-bottom: 5px;';
        chartContainer.appendChild(title);
        
        document.body.appendChild(chartContainer);
        
        this.scalingChart = canvas;
        this.scalingCtx = canvas.getContext('2d');
        this.scalingData = [];
        
        this.animateScalingChart();
    }
    
    animateScalingChart() {
        const ctx = this.scalingCtx;
        const canvas = this.scalingChart;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Generate scaling data
            const time = Date.now() * 0.001;
            const throughput = 1000 + Math.sin(time * 0.5) * 200 + Math.random() * 50;
            this.scalingData.push(throughput);
            
            if (this.scalingData.length > 50) {
                this.scalingData.shift();
            }
            
            // Draw chart
            ctx.strokeStyle = '#a3a3ff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            this.scalingData.forEach((value, index) => {
                const x = (index / (this.scalingData.length - 1)) * canvas.width;
                const y = canvas.height - ((value - 800) / 400) * canvas.height;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
            
            // Draw performance indicators
            ctx.fillStyle = '#00ff00';
            ctx.font = '10px monospace';
            ctx.fillText(`${Math.round(throughput)} req/s`, 5, 15);
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    createThroughputVisualization() {
        const throughputContainer = document.createElement('div');
        throughputContainer.id = 'throughput-viz';
        throughputContainer.style.cssText = `
            position: fixed;
            top: 50%;
            right: 1rem;
            width: 200px;
            height: 100px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid #6366f1;
            border-radius: 8px;
            z-index: 30;
            padding: 10px;
            transform: translateY(-50%);
        `;
        
        const title = document.createElement('div');
        title.textContent = 'LLM Throughput';
        title.style.cssText = 'color: #6366f1; font-size: 12px; margin-bottom: 5px;';
        throughputContainer.appendChild(title);
        
        const canvas = document.createElement('canvas');
        canvas.width = 180;
        canvas.height = 80;
        canvas.style.cssText = 'width: 100%; height: 100%;';
        throughputContainer.appendChild(canvas);
        
        document.body.appendChild(throughputContainer);
        
        this.throughputCanvas = canvas;
        this.throughputCtx = canvas.getContext('2d');
        this.throughputData = [];
        
        this.animateThroughput();
    }
    
    animateThroughput() {
        const ctx = this.throughputCtx;
        const canvas = this.throughputCanvas;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Generate throughput data
            const time = Date.now() * 0.001;
            const tokensPerSecond = 50 + Math.sin(time * 2) * 20 + Math.random() * 10;
            this.throughputData.push(tokensPerSecond);
            
            if (this.throughputData.length > 30) {
                this.throughputData.shift();
            }
            
            // Draw bars
            const barWidth = canvas.width / this.throughputData.length;
            
            this.throughputData.forEach((value, index) => {
                const barHeight = (value / 80) * canvas.height;
                const x = index * barWidth;
                const y = canvas.height - barHeight;
                
                const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
                gradient.addColorStop(0, '#6366f1');
                gradient.addColorStop(1, '#a3a3ff');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, y, barWidth - 1, barHeight);
            });
            
            // Draw current value
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px monospace';
            ctx.fillText(`${Math.round(tokensPerSecond)} tok/s`, 5, 15);
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    initTokenGeneration() {
        const generatedTextElement = document.getElementById('generated-text');
        const tokensPerSecElement = document.getElementById('tokens-per-sec');
        
        if (!generatedTextElement || !tokensPerSecElement) return;
        
        const sampleTexts = [
            "The transformer architecture revolutionized natural language processing...",
            "Reinforcement learning from human feedback (RLHF) enables...",
            "Multilingual toxicity detection requires robust evaluation...",
            "Adversarial robustness in language models is crucial for...",
            "Scaling laws predict model performance based on...",
            "Attention mechanisms allow models to focus on relevant...",
            "Policy gradient methods optimize reward functions through...",
            "Evaluation metrics must capture both accuracy and safety..."
        ];
        
        let currentText = "";
        let currentIndex = 0;
        let tokensPerSecond = 0;
        
        const generateTokens = () => {
            const time = Date.now() * 0.001;
            tokensPerSecond = 15 + Math.sin(time * 0.5) * 5 + Math.random() * 3;
            
            // Update tokens per second display
            tokensPerSecElement.textContent = Math.round(tokensPerSecond);
            
            // Generate new tokens
            if (currentIndex < sampleTexts.length) {
                const targetText = sampleTexts[currentIndex];
                const tokensToAdd = Math.ceil(tokensPerSecond / 10); // Add tokens based on speed
                
                for (let i = 0; i < tokensToAdd && currentText.length < targetText.length; i++) {
                    currentText += targetText[currentText.length];
                }
                
                generatedTextElement.textContent = currentText + "▋";
                
                // Move to next text when current is complete
                if (currentText.length >= targetText.length) {
                    currentIndex = (currentIndex + 1) % sampleTexts.length;
                    currentText = "";
                }
            }
            
            requestAnimationFrame(generateTokens);
        };
        
        generateTokens();
    }
    
    // Public methods
    pauseAnimations() {
        gsap.globalTimeline.pause();
    }
    
    resumeAnimations() {
        gsap.globalTimeline.resume();
    }
    
    getPerformanceMetrics() {
        return { ...this.performanceMetrics };
    }
}

// Initialize performance animation system
let performanceSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    performanceSystem = new PerformanceAnimationSystem();
});

// Export for external use
window.PerformanceAnimationSystem = PerformanceAnimationSystem;
