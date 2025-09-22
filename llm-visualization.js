/**
 * GOD-LEVEL LLM Neural Network Visualization
 * Features: Real-time neural network inference, attention mechanisms, token flow
 */

class LLMVisualization {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.clock = new THREE.Clock();
        
        // Neural network structure
        this.layers = [];
        this.neurons = [];
        this.connections = [];
        this.attentionWeights = [];
        this.tokenFlow = [];
        
        // Animation properties
        this.animationId = null;
        this.isAnimating = false;
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.createNeuralNetwork();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0b0b0f);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 0, 50);
        
        // Renderer setup with anti-aliasing
        const canvas = document.getElementById('llm-canvas');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0b0b0f, 0);
        
        // Post-processing setup
        this.setupPostProcessing();
        
        // Lighting
        this.setupLighting();
    }
    
    setupPostProcessing() {
        this.composer = new THREE.EffectComposer(this.renderer);
        
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        
        // Custom shader for neural network glow
        const neuralGlowShader = {
            uniforms: {
                tDiffuse: { value: null },
                time: { value: 0.0 },
                intensity: { value: 1.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform float time;
                uniform float intensity;
                varying vec2 vUv;
                
                void main() {
                    vec4 color = texture2D(tDiffuse, vUv);
                    float glow = sin(time * 2.0 + vUv.x * 10.0) * 0.5 + 0.5;
                    color.rgb += vec3(0.6, 0.4, 1.0) * glow * intensity * 0.3;
                    gl_FragColor = color;
                }
            `
        };
        
        const neuralGlowPass = new THREE.ShaderPass(neuralGlowShader);
        neuralGlowPass.renderToScreen = true;
        this.composer.addPass(neuralGlowPass);
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        this.scene.add(ambientLight);
        
        // Directional lights for neural network
        const light1 = new THREE.DirectionalLight(0xa3a3ff, 0.8);
        light1.position.set(10, 10, 5);
        this.scene.add(light1);
        
        const light2 = new THREE.DirectionalLight(0x6366f1, 0.6);
        light2.position.set(-10, -10, 5);
        this.scene.add(light2);
        
        // Point lights for attention visualization
        const pointLight = new THREE.PointLight(0xff6b6b, 0.5, 100);
        pointLight.position.set(0, 0, 20);
        this.scene.add(pointLight);
    }
    
    createNeuralNetwork() {
        // Create transformer-like architecture
        const layerCount = 8;
        const neuronsPerLayer = [512, 256, 128, 64, 32, 64, 128, 256];
        
        for (let layer = 0; layer < layerCount; layer++) {
            const layerNeurons = [];
            const neuronCount = neuronsPerLayer[layer];
            const x = (layer - layerCount / 2) * 15;
            
            for (let i = 0; i < neuronCount; i++) {
                const y = (i - neuronCount / 2) * 2;
                const z = Math.sin(i * 0.1) * 2;
                
                // Create neuron
                const geometry = new THREE.SphereGeometry(0.3, 16, 16);
                const material = new THREE.MeshPhongMaterial({
                    color: 0xa3a3ff,
                    transparent: true,
                    opacity: 0.8,
                    emissive: 0x220022
                });
                
                const neuron = new THREE.Mesh(geometry, material);
                neuron.position.set(x, y, z);
                neuron.userData = {
                    layer: layer,
                    index: i,
                    activation: 0,
                    targetActivation: 0
                };
                
                layerNeurons.push(neuron);
                this.neurons.push(neuron);
                this.scene.add(neuron);
            }
            
            this.layers.push(layerNeurons);
        }
        
        // Create connections between layers
        this.createConnections();
        
        // Create attention mechanism visualization
        this.createAttentionMechanism();
    }
    
    createConnections() {
        for (let layer = 0; layer < this.layers.length - 1; layer++) {
            const currentLayer = this.layers[layer];
            const nextLayer = this.layers[layer + 1];
            
            for (let i = 0; i < currentLayer.length; i++) {
                for (let j = 0; j < nextLayer.length; j++) {
                    const connection = this.createConnection(
                        currentLayer[i].position,
                        nextLayer[j].position
                    );
                    this.connections.push(connection);
                    this.scene.add(connection);
                }
            }
        }
    }
    
    createConnection(start, end) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array([
            start.x, start.y, start.z,
            end.x, end.y, end.z
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.LineBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.3
        });
        
        return new THREE.Line(geometry, material);
    }
    
    createAttentionMechanism() {
        // Create attention heads visualization
        const attentionHeads = 8;
        const headRadius = 5;
        
        for (let head = 0; head < attentionHeads; head++) {
            const angle = (head / attentionHeads) * Math.PI * 2;
            const x = Math.cos(angle) * headRadius;
            const y = Math.sin(angle) * headRadius;
            
            const geometry = new THREE.RingGeometry(0.5, 1, 16);
            const material = new THREE.MeshBasicMaterial({
                color: 0xff6b6b,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide
            });
            
            const attentionHead = new THREE.Mesh(geometry, material);
            attentionHead.position.set(x, y, 0);
            attentionHead.userData = {
                head: head,
                attention: 0
            };
            
            this.attentionWeights.push(attentionHead);
            this.scene.add(attentionHead);
        }
    }
    
    setupEventListeners() {
        // Mouse movement
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.composer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Scroll interaction
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            this.camera.position.z = 50 + scrollY * 0.05;
            this.camera.rotation.x = scrollY * 0.0005;
        });
    }
    
    simulateInference() {
        // Simulate forward pass through the network
        for (let layer = 0; layer < this.layers.length; layer++) {
            const layerNeurons = this.layers[layer];
            
            for (let i = 0; i < layerNeurons.length; i++) {
                const neuron = layerNeurons[i];
                const userData = neuron.userData;
                
                // Simulate activation
                userData.targetActivation = Math.sin(this.clock.getElapsedTime() * 2 + layer * 0.5 + i * 0.1);
                userData.activation += (userData.targetActivation - userData.activation) * 0.1;
                
                // Update neuron appearance
                const intensity = Math.abs(userData.activation);
                neuron.material.emissive.setHex(0x220022 * intensity);
                neuron.scale.setScalar(1 + intensity * 0.5);
            }
        }
        
        // Update attention weights
        for (let i = 0; i < this.attentionWeights.length; i++) {
            const head = this.attentionWeights[i];
            const attention = Math.sin(this.clock.getElapsedTime() * 3 + i * 0.5) * 0.5 + 0.5;
            head.userData.attention = attention;
            head.material.opacity = 0.3 + attention * 0.4;
            head.rotation.z = this.clock.getElapsedTime() * 0.5 + i * 0.2;
        }
        
        // Update connections
        for (let i = 0; i < this.connections.length; i++) {
            const connection = this.connections[i];
            const opacity = Math.sin(this.clock.getElapsedTime() * 4 + i * 0.01) * 0.2 + 0.3;
            connection.material.opacity = opacity;
        }
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const elapsedTime = this.clock.getElapsedTime();
        
        // Simulate neural network inference
        this.simulateInference();
        
        // Camera movement
        this.camera.position.x += (this.mouse.x * 10 - this.camera.position.x) * 0.02;
        this.camera.position.y += (this.mouse.y * 10 - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);
        
        // Update post-processing uniforms
        if (this.composer.passes[1].uniforms) {
            this.composer.passes[1].uniforms.time.value = elapsedTime;
        }
        
        // Render with post-processing
        this.composer.render();
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.renderer.dispose();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LLMVisualization();
});
