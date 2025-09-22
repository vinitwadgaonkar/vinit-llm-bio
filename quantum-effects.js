/**
 * INSANE QUANTUM EFFECTS
 * Features: Quantum field visualization, particle entanglement, dimensional shifts
 */

class QuantumEffects {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.time = 0;
        
        // Quantum properties
        this.quantumParticles = [];
        this.entangledPairs = [];
        this.quantumFields = [];
        this.dimensionalShifts = [];
        
        // Animation properties
        this.quantumCoherence = 0.847;
        this.dimensionalAwareness = 11;
        this.entanglementStrength = 0.9;
        
        this.init();
        this.createQuantumSystem();
        this.animate();
    }
    
    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'quantum-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 15;
            pointer-events: none;
            opacity: 0.6;
        `;
        
        document.getElementById('quantum-streams').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resize();
        
        // Event listeners
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createQuantumSystem() {
        // Create quantum particles
        for (let i = 0; i < 100; i++) {
            this.quantumParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: this.getQuantumColor(),
                spin: Math.random() * Math.PI * 2,
                energy: Math.random(),
                entangled: false
            });
        }
        
        // Create entangled pairs
        for (let i = 0; i < 20; i++) {
            const particle1 = this.quantumParticles[i * 2];
            const particle2 = this.quantumParticles[i * 2 + 1];
            
            this.entangledPairs.push({
                particle1: particle1,
                particle2: particle2,
                strength: Math.random() * 0.5 + 0.5,
                phase: Math.random() * Math.PI * 2
            });
            
            particle1.entangled = true;
            particle2.entangled = true;
        }
        
        // Create quantum fields
        for (let i = 0; i < 5; i++) {
            this.quantumFields.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 100 + 50,
                intensity: Math.random() * 0.5 + 0.3,
                frequency: Math.random() * 2 + 1,
                color: this.getQuantumColor()
            });
        }
        
        // Create dimensional shifts
        for (let i = 0; i < 3; i++) {
            this.dimensionalShifts.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                dimension: Math.floor(Math.random() * 11) + 1,
                strength: Math.random() * 0.5 + 0.3,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    getQuantumColor() {
        const colors = [
            '#00ffff', '#ff00ff', '#ffff00', '#00ff00',
            '#ff8000', '#ff0080', '#8000ff', '#0080ff'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateQuantumSystem() {
        this.time += 0.016;
        
        // Update quantum coherence
        this.quantumCoherence = 0.8 + Math.sin(this.time * 0.5) * 0.1;
        
        // Update particles
        this.quantumParticles.forEach(particle => {
            // Quantum uncertainty
            particle.x += particle.vx + (Math.random() - 0.5) * 0.5;
            particle.y += particle.vy + (Math.random() - 0.5) * 0.5;
            
            // Spin
            particle.spin += 0.1;
            
            // Energy fluctuation
            particle.energy = Math.sin(this.time * 2 + particle.x * 0.01) * 0.5 + 0.5;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
        
        // Update entangled pairs
        this.entangledPairs.forEach(pair => {
            const particle1 = pair.particle1;
            const particle2 = pair.particle2;
            
            // Quantum entanglement effect
            const distance = Math.sqrt(
                Math.pow(particle1.x - particle2.x, 2) + 
                Math.pow(particle1.y - particle2.y, 2)
            );
            
            if (distance < 200) {
                // Attraction force
                const force = pair.strength * 0.01;
                const dx = particle2.x - particle1.x;
                const dy = particle2.y - particle1.y;
                
                particle1.vx += dx * force;
                particle1.vy += dy * force;
                particle2.vx -= dx * force;
                particle2.vy -= dy * force;
            }
            
            // Synchronized spin
            particle1.spin = particle2.spin + pair.phase;
        });
        
        // Update quantum fields
        this.quantumFields.forEach(field => {
            field.intensity = Math.sin(this.time * field.frequency) * 0.3 + 0.4;
            field.radius += Math.sin(this.time * 0.5) * 0.5;
        });
        
        // Update dimensional shifts
        this.dimensionalShifts.forEach(shift => {
            shift.strength = Math.sin(this.time * 2 + shift.phase) * 0.3 + 0.4;
        });
    }
    
    drawQuantumSystem() {
        // Clear canvas with fade
        this.ctx.fillStyle = 'rgba(0, 0, 17, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw quantum fields
        this.quantumFields.forEach(field => {
            this.ctx.strokeStyle = field.color + Math.floor(field.intensity * 255).toString(16).padStart(2, '0');
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(field.x, field.y, field.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Field center
            this.ctx.fillStyle = field.color + Math.floor(field.intensity * 255).toString(16).padStart(2, '0');
            this.ctx.beginPath();
            this.ctx.arc(field.x, field.y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw entangled connections
        this.entangledPairs.forEach(pair => {
            const particle1 = pair.particle1;
            const particle2 = pair.particle2;
            
            const distance = Math.sqrt(
                Math.pow(particle1.x - particle2.x, 2) + 
                Math.pow(particle1.y - particle2.y, 2)
            );
            
            if (distance < 200) {
                this.ctx.strokeStyle = '#00ffff' + Math.floor(pair.strength * 255).toString(16).padStart(2, '0');
                this.ctx.lineWidth = pair.strength * 3;
                this.ctx.beginPath();
                this.ctx.moveTo(particle1.x, particle1.y);
                this.ctx.lineTo(particle2.x, particle2.y);
                this.ctx.stroke();
            }
        });
        
        // Draw quantum particles
        this.quantumParticles.forEach(particle => {
            // Particle glow
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10 * particle.energy;
            
            // Particle body
            this.ctx.fillStyle = particle.color + Math.floor(particle.energy * 255).toString(16).padStart(2, '0');
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * particle.energy, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Spin indicator
            if (particle.entangled) {
                this.ctx.strokeStyle = particle.color;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size * 2, particle.spin, particle.spin + Math.PI);
                this.ctx.stroke();
            }
            
            this.ctx.shadowBlur = 0;
        });
        
        // Draw dimensional shifts
        this.dimensionalShifts.forEach(shift => {
            this.ctx.strokeStyle = '#ff00ff' + Math.floor(shift.strength * 255).toString(16).padStart(2, '0');
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            
            // Draw dimensional portal
            for (let i = 0; i < shift.dimension; i++) {
                const angle = (i / shift.dimension) * Math.PI * 2;
                const radius = 30 + Math.sin(this.time * 3 + angle) * 10;
                const x = shift.x + Math.cos(angle) * radius;
                const y = shift.y + Math.sin(angle) * radius;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            this.ctx.stroke();
            
            // Dimension label
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '12px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`${shift.dimension}D`, shift.x, shift.y + 5);
        });
        
        // Draw quantum coherence indicator
        this.drawQuantumCoherence();
    }
    
    drawQuantumCoherence() {
        const x = this.canvas.width - 150;
        const y = 100;
        const width = 100;
        const height = 20;
        
        // Background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(x, y, width, height);
        
        // Coherence bar
        const coherenceWidth = this.quantumCoherence * width;
        this.ctx.fillStyle = '#00ffff';
        this.ctx.fillRect(x, y, coherenceWidth, height);
        
        // Border
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, width, height);
        
        // Label
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px monospace';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Quantum Coherence: ${this.quantumCoherence.toFixed(3)}`, x, y - 10);
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.updateQuantumSystem();
        this.drawQuantumSystem();
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
    new QuantumEffects();
});
