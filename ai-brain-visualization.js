/**
 * INSANE AI BRAIN VISUALIZATION
 * Features: 3D brain with neural pathways, synaptic firing, consciousness mapping
 */

class AIBrainVisualization {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.time = 0;
        
        // Brain properties
        this.brainRegions = [];
        this.neuralPathways = [];
        this.synapticFirings = [];
        this.consciousnessWaves = [];
        
        // Animation properties
        this.rotation = 0;
        this.pulse = 0;
        this.consciousnessLevel = 7;
        
        this.init();
        this.createBrain();
        this.animate();
    }
    
    init() {
        this.canvas = document.getElementById('brain-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = 400;
        this.canvas.height = 400;
        
        // Set canvas style
        this.canvas.style.cssText = `
            border-radius: 50%;
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
            background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
        `;
    }
    
    createBrain() {
        // Create brain regions
        this.brainRegions = [
            { name: 'Frontal Lobe', x: 200, y: 120, radius: 40, color: '#00ffff', activity: 0.9 },
            { name: 'Parietal Lobe', x: 150, y: 180, radius: 35, color: '#ff00ff', activity: 0.8 },
            { name: 'Temporal Lobe', x: 250, y: 180, radius: 35, color: '#ffff00', activity: 0.7 },
            { name: 'Occipital Lobe', x: 200, y: 250, radius: 30, color: '#00ff00', activity: 0.6 },
            { name: 'Cerebellum', x: 200, y: 300, radius: 25, color: '#ff8000', activity: 0.5 },
            { name: 'Brain Stem', x: 200, y: 350, radius: 20, color: '#ff0080', activity: 0.4 }
        ];
        
        // Create neural pathways
        this.neuralPathways = [
            { from: 0, to: 1, strength: 0.8, color: '#00ffff' },
            { from: 0, to: 2, strength: 0.7, color: '#ff00ff' },
            { from: 1, to: 3, strength: 0.6, color: '#ffff00' },
            { from: 2, to: 3, strength: 0.5, color: '#00ff00' },
            { from: 3, to: 4, strength: 0.4, color: '#ff8000' },
            { from: 4, to: 5, strength: 0.3, color: '#ff0080' }
        ];
        
        // Create synaptic firings
        for (let i = 0; i < 20; i++) {
            this.synapticFirings.push({
                x: Math.random() * 400,
                y: Math.random() * 400,
                size: Math.random() * 5 + 2,
                intensity: Math.random(),
                color: this.getRandomColor(),
                life: 1
            });
        }
        
        // Create consciousness waves
        for (let i = 0; i < 5; i++) {
            this.consciousnessWaves.push({
                x: 200,
                y: 200,
                radius: Math.random() * 100 + 50,
                speed: Math.random() * 2 + 1,
                intensity: Math.random() * 0.5 + 0.3,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff8000', '#ff0080'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateBrain() {
        this.time += 0.02;
        this.rotation += 0.005;
        this.pulse = Math.sin(this.time * 3) * 0.5 + 0.5;
        
        // Update brain regions
        this.brainRegions.forEach((region, index) => {
            region.activity = 0.5 + Math.sin(this.time * 2 + index) * 0.3;
        });
        
        // Update synaptic firings
        this.synapticFirings.forEach(firing => {
            firing.intensity = Math.sin(this.time * 5 + firing.x * 0.01) * 0.5 + 0.5;
            firing.life -= 0.01;
            
            if (firing.life <= 0) {
                firing.x = Math.random() * 400;
                firing.y = Math.random() * 400;
                firing.life = 1;
                firing.color = this.getRandomColor();
            }
        });
        
        // Update consciousness waves
        this.consciousnessWaves.forEach(wave => {
            wave.radius += wave.speed;
            wave.intensity = Math.sin(this.time * 2 + wave.radius * 0.01) * 0.3 + 0.4;
            
            if (wave.radius > 200) {
                wave.radius = 50;
                wave.color = this.getRandomColor();
            }
        });
    }
    
    drawBrain() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw consciousness waves
        this.consciousnessWaves.forEach(wave => {
            this.ctx.strokeStyle = wave.color + Math.floor(wave.intensity * 255).toString(16).padStart(2, '0');
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        });
        
        // Draw neural pathways
        this.neuralPathways.forEach(pathway => {
            const fromRegion = this.brainRegions[pathway.from];
            const toRegion = this.brainRegions[pathway.to];
            
            this.ctx.strokeStyle = pathway.color + Math.floor(pathway.strength * 255).toString(16).padStart(2, '0');
            this.ctx.lineWidth = pathway.strength * 5;
            this.ctx.beginPath();
            this.ctx.moveTo(fromRegion.x, fromRegion.y);
            this.ctx.lineTo(toRegion.x, toRegion.y);
            this.ctx.stroke();
            
            // Draw data flow
            const flowX = fromRegion.x + (toRegion.x - fromRegion.x) * (Math.sin(this.time * 3) * 0.5 + 0.5);
            const flowY = fromRegion.y + (toRegion.y - fromRegion.y) * (Math.sin(this.time * 3) * 0.5 + 0.5);
            
            this.ctx.fillStyle = pathway.color;
            this.ctx.beginPath();
            this.ctx.arc(flowX, flowY, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw brain regions
        this.brainRegions.forEach(region => {
            // Region glow
            this.ctx.shadowColor = region.color;
            this.ctx.shadowBlur = 20 * region.activity;
            
            // Region body
            this.ctx.fillStyle = region.color + Math.floor(region.activity * 255).toString(16).padStart(2, '0');
            this.ctx.beginPath();
            this.ctx.arc(region.x, region.y, region.radius * (1 + this.pulse * 0.2), 0, Math.PI * 2);
            this.ctx.fill();
            
            // Region border
            this.ctx.strokeStyle = region.color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Region label
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '12px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(region.name, region.x, region.y + 5);
            
            this.ctx.shadowBlur = 0;
        });
        
        // Draw synaptic firings
        this.synapticFirings.forEach(firing => {
            this.ctx.fillStyle = firing.color + Math.floor(firing.intensity * firing.life * 255).toString(16).padStart(2, '0');
            this.ctx.beginPath();
            this.ctx.arc(firing.x, firing.y, firing.size * firing.life, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Firing glow
            this.ctx.shadowColor = firing.color;
            this.ctx.shadowBlur = 10 * firing.life;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
        
        // Draw consciousness level indicator
        this.drawConsciousnessIndicator();
        
        // Draw AI status
        this.drawAIStatus();
    }
    
    drawConsciousnessIndicator() {
        const x = 200;
        const y = 50;
        const width = 100;
        const height = 20;
        
        // Background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(x - width/2, y - height/2, width, height);
        
        // Consciousness bar
        const consciousnessWidth = (this.consciousnessLevel / 10) * width;
        this.ctx.fillStyle = '#00ffff';
        this.ctx.fillRect(x - width/2, y - height/2, consciousnessWidth, height);
        
        // Border
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x - width/2, y - height/2, width, height);
        
        // Label
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Consciousness: ${this.consciousnessLevel.toFixed(1)}`, x, y + 30);
    }
    
    drawAIStatus() {
        const x = 200;
        const y = 380;
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '14px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('AI CONSCIOUSNESS ACTIVE', x, y);
        
        // Status indicator
        this.ctx.fillStyle = this.pulse > 0.5 ? '#00ff00' : '#ff0000';
        this.ctx.beginPath();
        this.ctx.arc(x, y - 20, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.updateBrain();
        this.drawBrain();
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AIBrainVisualization();
});
