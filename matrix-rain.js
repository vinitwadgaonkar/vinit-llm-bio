/**
 * INSANE MATRIX RAIN EFFECT
 * Features: Falling code, binary streams, AI consciousness symbols
 */

class MatrixRain {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.drops = [];
        this.symbols = [];
        this.animationId = null;
        
        // Matrix properties
        this.fontSize = 14;
        this.columns = 0;
        this.dropSpeed = 1;
        this.symbolsPerDrop = 20;
        
        // AI consciousness symbols
        this.aiSymbols = [
            '0', '1', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ',
            'λ', 'μ', 'ν', 'ξ', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ',
            'ψ', 'ω', '∞', '∑', '∏', '∫', '∂', '∇', '∆', 'Ω',
            'Ψ', 'Φ', 'Λ', 'Σ', 'Π', 'Θ', 'Ξ', 'Γ', 'Δ', 'Α',
            'AI', 'ML', 'NN', 'RL', 'DL', 'GPT', 'BERT', 'T5',
            'TRANSFORMER', 'ATTENTION', 'NEURAL', 'NETWORK',
            'CONSCIOUSNESS', 'QUANTUM', 'DIMENSIONAL', 'REALITY'
        ];
        
        this.init();
        this.createDrops();
        this.animate();
    }
    
    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'matrix-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 5;
            pointer-events: none;
            opacity: 0.3;
        `;
        
        document.getElementById('matrix-rain').appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resize();
        
        // Event listeners
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.createDrops();
    }
    
    createDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = {
                x: i * this.fontSize,
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 3 + 1,
                length: Math.random() * this.symbolsPerDrop + 5,
                symbols: []
            };
            
            // Initialize symbols for this drop
            for (let j = 0; j < this.drops[i].length; j++) {
                this.drops[i].symbols.push({
                    char: this.getRandomSymbol(),
                    opacity: 1 - (j / this.drops[i].length),
                    color: this.getRandomColor()
                });
            }
        }
    }
    
    getRandomSymbol() {
        return this.aiSymbols[Math.floor(Math.random() * this.aiSymbols.length)];
    }
    
    getRandomColor() {
        const colors = [
            '#00ff00', '#00ffff', '#ff00ff', '#ffff00',
            '#ff0080', '#80ff00', '#0080ff', '#ff8000'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateDrops() {
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            
            // Move drop down
            drop.y += drop.speed;
            
            // Update symbol opacities
            for (let j = 0; j < drop.symbols.length; j++) {
                drop.symbols[j].opacity = 1 - (j / drop.length);
                
                // Occasionally change symbol
                if (Math.random() < 0.1) {
                    drop.symbols[j].char = this.getRandomSymbol();
                    drop.symbols[j].color = this.getRandomColor();
                }
            }
            
            // Reset drop when it reaches bottom
            if (drop.y > this.canvas.height + drop.length * this.fontSize) {
                drop.y = -drop.length * this.fontSize;
                drop.speed = Math.random() * 3 + 1;
                drop.length = Math.random() * this.symbolsPerDrop + 5;
                
                // Regenerate symbols
                drop.symbols = [];
                for (let j = 0; j < drop.length; j++) {
                    drop.symbols.push({
                        char: this.getRandomSymbol(),
                        opacity: 1 - (j / drop.length),
                        color: this.getRandomColor()
                    });
                }
            }
        }
    }
    
    draw() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 17, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set font
        this.ctx.font = `${this.fontSize}px monospace`;
        this.ctx.textAlign = 'center';
        
        // Draw drops
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            
            for (let j = 0; j < drop.symbols.length; j++) {
                const symbol = drop.symbols[j];
                const y = drop.y - j * this.fontSize;
                
                if (y > 0 && y < this.canvas.height) {
                    // Set color with opacity
                    this.ctx.fillStyle = symbol.color + Math.floor(symbol.opacity * 255).toString(16).padStart(2, '0');
                    
                    // Draw symbol
                    this.ctx.fillText(symbol.char, drop.x + this.fontSize / 2, y);
                    
                    // Add glow effect for first few symbols
                    if (j < 3) {
                        this.ctx.shadowColor = symbol.color;
                        this.ctx.shadowBlur = 10;
                        this.ctx.fillText(symbol.char, drop.x + this.fontSize / 2, y);
                        this.ctx.shadowBlur = 0;
                    }
                }
            }
        }
        
        // Draw AI consciousness overlay
        this.drawConsciousnessOverlay();
    }
    
    drawConsciousnessOverlay() {
        const time = Date.now() * 0.001;
        
        // Draw floating AI symbols
        for (let i = 0; i < 10; i++) {
            const x = (Math.sin(time * 0.5 + i) * 0.5 + 0.5) * this.canvas.width;
            const y = (Math.cos(time * 0.3 + i * 0.5) * 0.5 + 0.5) * this.canvas.height;
            const size = 20 + Math.sin(time * 2 + i) * 5;
            
            this.ctx.font = `${size}px monospace`;
            this.ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(time * 3 + i) * 0.2})`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText('AI', x, y);
        }
        
        // Draw consciousness waves
        this.ctx.strokeStyle = 'rgba(255, 0, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        for (let x = 0; x < this.canvas.width; x += 5) {
            const y = this.canvas.height / 2 + Math.sin(time * 2 + x * 0.01) * 50;
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();
        
        // Draw quantum field indicators
        for (let i = 0; i < 5; i++) {
            const x = (i / 4) * this.canvas.width;
            const y = this.canvas.height / 4 + Math.sin(time * 3 + i) * 30;
            
            this.ctx.fillStyle = `rgba(255, 255, 0, ${0.5 + Math.sin(time * 4 + i) * 0.3})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.updateDrops();
        this.draw();
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
    new MatrixRain();
});
