/**
 * INSANE NEURAL NETWORK VISUALIZATION
 * Features: Real-time neural network simulation, interactive nodes, dynamic connections
 */

class NeuralNetworkViz {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.time = 0;
        
        // Neural network properties
        this.layers = [];
        this.connections = [];
        this.activations = [];
        this.weights = [];
        
        // Animation properties
        this.isAnimating = false;
        this.animationSpeed = 1;
        
        this.init();
        this.createNetwork();
        this.animate();
    }
    
    init() {
        this.canvas = document.getElementById('neural-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = 400;
        this.canvas.height = 400;
        
        // Set canvas style
        this.canvas.style.cssText = `
            border-radius: 16px;
            box-shadow: 0 0 50px rgba(163, 163, 255, 0.3);
            background: radial-gradient(circle, rgba(163, 163, 255, 0.1) 0%, transparent 70%);
        `;
    }
    
    createNetwork() {
        // Create neural network layers
        const layerSizes = [8, 12, 16, 12, 8, 6, 4, 2];
        const layerCount = layerSizes.length;
        
        for (let layer = 0; layer < layerCount; layer++) {
            const layerNodes = [];
            const x = (layer / (layerCount - 1)) * (this.canvas.width - 100) + 50;
            
            for (let node = 0; node < layerSizes[layer]; node++) {
                const y = (node / (layerSizes[layer] - 1)) * (this.canvas.height - 100) + 50;
                
                layerNodes.push({
                    x: x,
                    y: y,
                    activation: 0,
                    targetActivation: 0,
                    bias: Math.random() - 0.5,
                    color: this.getNodeColor(layer, node)
                });
            }
            
            this.layers.push(layerNodes);
        }
        
        // Create connections between layers
        for (let layer = 0; layer < this.layers.length - 1; layer++) {
            const currentLayer = this.layers[layer];
            const nextLayer = this.layers[layer + 1];
            
            for (let i = 0; i < currentLayer.length; i++) {
                for (let j = 0; j < nextLayer.length; j++) {
                    this.connections.push({
                        from: currentLayer[i],
                        to: nextLayer[j],
                        weight: Math.random() - 0.5,
                        strength: Math.random()
                    });
                }
            }
        }
    }
    
    getNodeColor(layer, node) {
        const colors = [
            '#a3a3ff', '#6366f1', '#ff6b6b', '#4ecdc4',
            '#ffe66d', '#ff9ff3', '#54a0ff', '#5f27cd'
        ];
        return colors[layer % colors.length];
    }
    
    updateNetwork() {
        this.time += 0.016;
        
        // Update activations
        this.layers.forEach((layer, layerIndex) => {
            layer.forEach((node, nodeIndex) => {
                // Simulate forward pass
                const input = Math.sin(this.time * 2 + layerIndex * 0.5 + nodeIndex * 0.1);
                node.targetActivation = (input + node.bias) / 2;
                node.activation += (node.targetActivation - node.activation) * 0.1;
            });
        });
        
        // Update connection weights
        this.connections.forEach(connection => {
            connection.weight += (Math.random() - 0.5) * 0.01;
            connection.weight = Math.max(-1, Math.min(1, connection.weight));
        });
    }
    
    drawNetwork() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.drawConnections();
        
        // Draw nodes
        this.drawNodes();
        
        // Draw labels
        this.drawLabels();
    }
    
    drawConnections() {
        this.connections.forEach(connection => {
            const from = connection.from;
            const to = connection.to;
            const weight = connection.weight;
            const strength = connection.strength;
            
            // Set connection color based on weight
            const color = weight > 0 ? '#4ecdc4' : '#ff6b6b';
            const alpha = Math.abs(weight) * strength;
            
            this.ctx.strokeStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            this.ctx.lineWidth = Math.abs(weight) * 3 + 1;
            
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.stroke();
            
            // Draw data flow
            const flowX = from.x + (to.x - from.x) * (Math.sin(this.time * 3) * 0.5 + 0.5);
            const flowY = from.y + (to.y - from.y) * (Math.sin(this.time * 3) * 0.5 + 0.5);
            
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawNodes() {
        this.layers.forEach((layer, layerIndex) => {
            layer.forEach((node, nodeIndex) => {
                // Node glow
                this.ctx.shadowColor = node.color;
                this.ctx.shadowBlur = 20 * Math.abs(node.activation);
                
                // Node body
                const size = 8 + Math.abs(node.activation) * 10;
                this.ctx.fillStyle = node.color + Math.floor(Math.abs(node.activation) * 255).toString(16).padStart(2, '0');
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Node border
                this.ctx.strokeStyle = node.color;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                
                this.ctx.shadowBlur = 0;
            });
        });
    }
    
    drawLabels() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px monospace';
        this.ctx.textAlign = 'center';
        
        // Layer labels
        const layerNames = ['Input', 'Hidden 1', 'Hidden 2', 'Hidden 3', 'Hidden 4', 'Hidden 5', 'Hidden 6', 'Output'];
        
        this.layers.forEach((layer, index) => {
            const x = layer[0].x;
            const y = 20;
            
            this.ctx.fillText(layerNames[index] || `Layer ${index + 1}`, x, y);
        });
        
        // Network info
        this.ctx.fillStyle = '#a3a3ff';
        this.ctx.font = '14px monospace';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Neural Network', 10, this.canvas.height - 30);
        this.ctx.fillText(`Layers: ${this.layers.length}`, 10, this.canvas.height - 15);
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        this.updateNetwork();
        this.drawNetwork();
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NeuralNetworkViz();
});
