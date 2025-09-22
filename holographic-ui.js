/**
 * INSANE HOLOGRAPHIC UI
 * Features: Sci-fi interface elements, scanning lines, corner brackets, holographic effects
 */

class HolographicUI {
    constructor() {
        this.animationId = null;
        this.time = 0;
        this.scanLines = [];
        this.cornerBrackets = [];
        this.holographicElements = [];
        
        this.init();
        this.createHolographicElements();
        this.animate();
    }
    
    init() {
        // Create scanning lines
        this.createScanLines();
        
        // Create corner brackets
        this.createCornerBrackets();
        
        // Create holographic elements
        this.createHolographicElements();
    }
    
    createScanLines() {
        // Horizontal scan line
        const horizontalScan = document.querySelector('.scan-line.horizontal');
        if (horizontalScan) {
            horizontalScan.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00ffff, transparent);
                z-index: 25;
                pointer-events: none;
                animation: horizontal-scan 3s linear infinite;
            `;
        }
        
        // Vertical scan line
        const verticalScan = document.querySelector('.scan-line.vertical');
        if (verticalScan) {
            verticalScan.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 2px;
                height: 100%;
                background: linear-gradient(180deg, transparent, #ff00ff, transparent);
                z-index: 25;
                pointer-events: none;
                animation: vertical-scan 4s linear infinite;
            `;
        }
    }
    
    createCornerBrackets() {
        const corners = [
            { selector: '.corner-bracket.top-left', position: 'top: 20px; left: 20px;' },
            { selector: '.corner-bracket.top-right', position: 'top: 20px; right: 20px;' },
            { selector: '.corner-bracket.bottom-left', position: 'bottom: 20px; left: 20px;' },
            { selector: '.corner-bracket.bottom-right', position: 'bottom: 20px; right: 20px;' }
        ];
        
        corners.forEach(corner => {
            const element = document.querySelector(corner.selector);
            if (element) {
                element.style.cssText = `
                    position: fixed;
                    ${corner.position}
                    width: 60px;
                    height: 60px;
                    z-index: 25;
                    pointer-events: none;
                    animation: corner-pulse 2s ease-in-out infinite;
                `;
                
                // Create bracket SVG
                element.innerHTML = `
                    <svg width="60" height="60" viewBox="0 0 60 60">
                        <path d="M10,10 L10,20 L20,20 L20,10 L10,10 Z" 
                              fill="none" 
                              stroke="#00ffff" 
                              stroke-width="2" 
                              opacity="0.8"/>
                        <path d="M40,10 L40,20 L50,20 L50,10 L40,10 Z" 
                              fill="none" 
                              stroke="#00ffff" 
                              stroke-width="2" 
                              opacity="0.8"/>
                        <path d="M10,40 L10,50 L20,50 L20,40 L10,40 Z" 
                              fill="none" 
                              stroke="#00ffff" 
                              stroke-width="2" 
                              opacity="0.8"/>
                        <path d="M40,40 L40,50 L50,50 L50,40 L40,40 Z" 
                              fill="none" 
                              stroke="#00ffff" 
                              stroke-width="2" 
                              opacity="0.8"/>
                    </svg>
                `;
            }
        });
    }
    
    createHolographicElements() {
        // Create holographic grid
        this.createHolographicGrid();
        
        // Create floating UI elements
        this.createFloatingElements();
        
        // Create data streams
        this.createDataStreams();
    }
    
    createHolographicGrid() {
        const grid = document.createElement('div');
        grid.id = 'holographic-grid';
        grid.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
            opacity: 0.1;
            background-image: 
                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: grid-pulse 4s ease-in-out infinite;
        `;
        
        document.body.appendChild(grid);
    }
    
    createFloatingElements() {
        // Create floating AI status indicators
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = 'floating-ai-element';
            element.style.cssText = `
                position: fixed;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, #00ffff, transparent);
                border-radius: 50%;
                z-index: 20;
                pointer-events: none;
                animation: float-ai ${2 + Math.random() * 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            document.body.appendChild(element);
        }
    }
    
    createDataStreams() {
        // Create flowing data streams
        for (let i = 0; i < 3; i++) {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            stream.style.cssText = `
                position: fixed;
                top: 0;
                left: ${Math.random() * 100}%;
                width: 2px;
                height: 100%;
                background: linear-gradient(180deg, transparent, #00ffff, transparent);
                z-index: 15;
                pointer-events: none;
                animation: data-flow ${3 + Math.random() * 2}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            
            document.body.appendChild(stream);
        }
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.time += 0.016;
        
        // Update floating elements
        this.updateFloatingElements();
        
        // Update data streams
        this.updateDataStreams();
    }
    
    updateFloatingElements() {
        const elements = document.querySelectorAll('.floating-ai-element');
        elements.forEach((element, index) => {
            const x = Math.sin(this.time * 0.5 + index) * 10;
            const y = Math.cos(this.time * 0.3 + index) * 5;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
            element.style.opacity = 0.3 + Math.sin(this.time * 2 + index) * 0.2;
        });
    }
    
    updateDataStreams() {
        const streams = document.querySelectorAll('.data-stream');
        streams.forEach((stream, index) => {
            const intensity = Math.sin(this.time * 2 + index) * 0.5 + 0.5;
            stream.style.opacity = intensity * 0.6;
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Remove created elements
        const elements = document.querySelectorAll('#holographic-grid, .floating-ai-element, .data-stream');
        elements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes horizontal-scan {
        0% { transform: translateY(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
    
    @keyframes vertical-scan {
        0% { transform: translateX(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(100vw); opacity: 0; }
    }
    
    @keyframes corner-pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.1); }
    }
    
    @keyframes grid-pulse {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
    }
    
    @keyframes float-ai {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
        50% { transform: translateY(-20px) scale(1.2); opacity: 0.8; }
    }
    
    @keyframes data-flow {
        0% { transform: translateY(-100vh); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HolographicUI();
});
