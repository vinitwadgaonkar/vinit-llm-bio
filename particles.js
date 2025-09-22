/**
 * INSANE PARTICLE SYSTEM
 * Features: Mind-blowing particle effects, interactive elements, dynamic animations
 */

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.mouse = { x: 0, y: 0 };
        this.isMouseDown = false;
        this.time = 0;
        
        this.init();
        this.createParticles();
        this.animate();
    }
    
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
            pointer-events: none;
            opacity: 0.8;
        `;
        
        document.getElementById('particles').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        
        // Event listeners
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        window.addEventListener('mousedown', () => this.isMouseDown = true);
        window.addEventListener('mouseup', () => this.isMouseDown = false);
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = 200;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: this.getRandomColor(),
                life: 1,
                maxLife: 1,
                type: Math.random() > 0.5 ? 'circle' : 'square',
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            '#a3a3ff', '#6366f1', '#ff6b6b', '#4ecdc4', 
            '#ffe66d', '#ff9ff3', '#54a0ff', '#5f27cd'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateParticles() {
        this.time += 0.016;
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Update rotation
            particle.rotation += particle.rotationSpeed;
            
            // Update pulse
            particle.pulse += 0.1;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.1;
                particle.vy += (dy / distance) * force * 0.1;
            }
            
            // Mouse click explosion
            if (this.isMouseDown && distance < 50) {
                particle.vx += (dx / distance) * 2;
                particle.vy += (dy / distance) * 2;
            }
            
            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Life cycle
            particle.life -= 0.001;
            if (particle.life <= 0) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.life = particle.maxLife;
                particle.color = this.getRandomColor();
            }
        });
    }
    
    drawParticles() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(11, 11, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            
            // Set position and rotation
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            
            // Set color with alpha
            const alpha = particle.life * 0.8;
            this.ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            
            // Draw particle
            const size = particle.size * (1 + Math.sin(particle.pulse) * 0.3);
            
            if (particle.type === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, size, 0, Math.PI * 2);
                this.ctx.fill();
            } else {
                this.ctx.fillRect(-size, -size, size * 2, size * 2);
            }
            
            // Add glow effect
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
            
            this.ctx.restore();
        });
        
        // Draw connections
        this.drawConnections();
    }
    
    drawConnections() {
        this.ctx.strokeStyle = 'rgba(163, 163, 255, 0.2)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const particle1 = this.particles[i];
                const particle2 = this.particles[j];
                
                const dx = particle1.x - particle2.x;
                const dy = particle1.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const alpha = (100 - distance) / 100;
                    this.ctx.strokeStyle = `rgba(163, 163, 255, ${alpha * 0.3})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle1.x, particle1.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.updateParticles();
        this.drawParticles();
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
