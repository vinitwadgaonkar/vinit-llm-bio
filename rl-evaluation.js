/**
 * GOD-LEVEL Reinforcement Learning Evaluation System
 * Features: Real-time RL metrics, policy optimization, reward scaling
 */

class RLEvaluationSystem {
    constructor() {
        this.metrics = {
            reward: 0.847,
            policyLoss: 0.023,
            valueLoss: 0.156,
            entropy: 0.892,
            learningRate: 0.0003,
            episodes: 0,
            steps: 0
        };
        
        this.history = {
            rewards: [],
            losses: [],
            entropies: []
        };
        
        this.isTraining = true;
        this.episodeCount = 0;
        this.stepCount = 0;
        
        this.init();
        this.startTraining();
    }
    
    init() {
        // Initialize metric displays
        this.updateMetricDisplays();
        
        // Create RL environment visualization
        this.createEnvironmentVisualization();
        
        // Start real-time updates
        this.startRealTimeUpdates();
    }
    
    createEnvironmentVisualization() {
        // Create a simple RL environment representation
        const canvas = document.createElement('canvas');
        canvas.id = 'rl-env-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 4rem;
            right: 1rem;
            width: 200px;
            height: 150px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid #a3a3ff;
            border-radius: 8px;
            z-index: 30;
        `;
        document.body.appendChild(canvas);
        
        this.envCanvas = canvas;
        this.envCtx = canvas.getContext('2d');
        
        this.animateEnvironment();
    }
    
    animateEnvironment() {
        const ctx = this.envCtx;
        const canvas = this.envCanvas;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw environment grid
            ctx.strokeStyle = '#a3a3ff';
            ctx.lineWidth = 1;
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.moveTo(i * 20, 0);
                ctx.lineTo(i * 20, canvas.height);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(0, i * 15);
                ctx.lineTo(canvas.width, i * 15);
                ctx.stroke();
            }
            
            // Draw agent (moving dot)
            const time = Date.now() * 0.001;
            const x = (Math.sin(time) * 0.5 + 0.5) * (canvas.width - 20) + 10;
            const y = (Math.cos(time * 0.7) * 0.5 + 0.5) * (canvas.height - 20) + 10;
            
            ctx.fillStyle = '#00ff00';
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw reward signal
            const rewardIntensity = Math.abs(this.metrics.reward);
            ctx.fillStyle = `rgba(255, 255, 0, ${rewardIntensity})`;
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.fill();
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    startTraining() {
        // Simulate RL training process
        setInterval(() => {
            this.simulateTrainingStep();
        }, 100); // Update every 100ms
    }
    
    simulateTrainingStep() {
        if (!this.isTraining) return;
        
        // Simulate policy gradient update
        const learningRate = this.metrics.learningRate;
        const noise = (Math.random() - 0.5) * 0.1;
        
        // Update reward (with some realistic RL behavior)
        const rewardChange = (Math.random() - 0.5) * 0.05;
        this.metrics.reward = Math.max(0, Math.min(1, this.metrics.reward + rewardChange));
        
        // Update policy loss (decreasing over time with noise)
        const policyLossDecay = 0.001;
        this.metrics.policyLoss = Math.max(0.001, this.metrics.policyLoss - policyLossDecay + noise * 0.01);
        
        // Update value loss (similar pattern)
        this.metrics.valueLoss = Math.max(0.001, this.metrics.valueLoss - policyLossDecay * 0.5 + noise * 0.005);
        
        // Update entropy (exploration vs exploitation)
        const entropyTarget = 0.5 + Math.sin(this.episodeCount * 0.1) * 0.3;
        this.metrics.entropy += (entropyTarget - this.metrics.entropy) * 0.01;
        
        // Update episode and step counts
        this.stepCount++;
        if (this.stepCount % 100 === 0) {
            this.episodeCount++;
            this.metrics.episodes = this.episodeCount;
        }
        this.metrics.steps = this.stepCount;
        
        // Store history
        this.history.rewards.push(this.metrics.reward);
        this.history.losses.push(this.metrics.policyLoss);
        this.history.entropies.push(this.metrics.entropy);
        
        // Keep history limited
        if (this.history.rewards.length > 100) {
            this.history.rewards.shift();
            this.history.losses.shift();
            this.history.entropies.shift();
        }
        
        this.updateMetricDisplays();
    }
    
    updateMetricDisplays() {
        // Update reward score
        const rewardElement = document.getElementById('reward-score');
        if (rewardElement) {
            const valueElement = rewardElement.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = this.metrics.reward.toFixed(3);
                valueElement.style.color = this.getMetricColor(this.metrics.reward, 0.8, 1.0);
            }
        }
        
        // Update policy loss
        const policyLossElement = document.getElementById('policy-loss');
        if (policyLossElement) {
            const valueElement = policyLossElement.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = this.metrics.policyLoss.toFixed(3);
                valueElement.style.color = this.getMetricColor(this.metrics.policyLoss, 0.0, 0.1, true);
            }
        }
        
        // Update value loss
        const valueLossElement = document.getElementById('value-loss');
        if (valueLossElement) {
            const valueElement = valueLossElement.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = this.metrics.valueLoss.toFixed(3);
                valueElement.style.color = this.getMetricColor(this.metrics.valueLoss, 0.0, 0.2, true);
            }
        }
        
        // Update entropy
        const entropyElement = document.getElementById('entropy');
        if (entropyElement) {
            const valueElement = entropyElement.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = this.metrics.entropy.toFixed(3);
                valueElement.style.color = this.getMetricColor(this.metrics.entropy, 0.5, 1.0);
            }
        }
    }
    
    getMetricColor(value, min, max, reverse = false) {
        const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
        const intensity = reverse ? 1 - normalized : normalized;
        
        if (intensity > 0.7) return '#00ff00'; // Green for good
        if (intensity > 0.4) return '#ffff00'; // Yellow for medium
        return '#ff0000'; // Red for bad
    }
    
    startRealTimeUpdates() {
        // Update displays every frame for smooth animations
        const update = () => {
            this.updateMetricDisplays();
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    }
    
    // Public methods for external control
    pauseTraining() {
        this.isTraining = false;
    }
    
    resumeTraining() {
        this.isTraining = true;
    }
    
    resetMetrics() {
        this.metrics = {
            reward: 0.5,
            policyLoss: 0.1,
            valueLoss: 0.2,
            entropy: 0.8,
            learningRate: 0.0003,
            episodes: 0,
            steps: 0
        };
        this.episodeCount = 0;
        this.stepCount = 0;
        this.history = {
            rewards: [],
            losses: [],
            entropies: []
        };
    }
    
    getMetrics() {
        return { ...this.metrics };
    }
    
    getHistory() {
        return { ...this.history };
    }
}

// Initialize RL evaluation system
let rlSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    rlSystem = new RLEvaluationSystem();
});

// Export for external use
window.RLEvaluationSystem = RLEvaluationSystem;
