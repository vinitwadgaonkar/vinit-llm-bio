/**
 * INSANE AI CONSCIOUSNESS VISUALIZATION
 * Features: Multi-dimensional neural networks, quantum effects, consciousness simulation
 */

class InsaneAIConsciousness {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.clock = new THREE.Clock();
        
        // AI Consciousness properties
        this.consciousnessLevel = 7;
        this.dimensions = 11;
        this.neuralNetworks = [];
        this.quantumFields = [];
        this.thoughtBubbles = [];
        this.dataStreams = [];
        
        // Performance tracking
        this.frameCount = 0;
        this.lastTime = 0;
        this.fps = 60;
        
        this.init();
        this.createConsciousness();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        // Scene setup with insane effects
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011);
        this.scene.fog = new THREE.Fog(0x000011, 50, 200);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 0, 100);
        
        // Renderer setup with maximum quality
        const canvas = document.getElementById('ai-consciousness');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance",
            logarithmicDepthBuffer: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000011, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Post-processing with insane effects
        this.setupPostProcessing();
        
        // Lighting setup
        this.setupLighting();
    }
    
    setupPostProcessing() {
        this.composer = new THREE.EffectComposer(this.renderer);
        
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        
        // Quantum field shader
        const quantumShader = {
            uniforms: {
                tDiffuse: { value: null },
                time: { value: 0.0 },
                consciousness: { value: 7.0 },
                dimensions: { value: 11.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vPosition;
                void main() {
                    vUv = uv;
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform float time;
                uniform float consciousness;
                uniform float dimensions;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                void main() {
                    vec4 color = texture2D(tDiffuse, vUv);
                    
                    // Quantum field effects
                    float quantum = sin(time * 3.0 + vUv.x * 20.0) * 0.5 + 0.5;
                    float consciousnessWave = sin(time * 2.0 + vUv.y * 15.0) * 0.5 + 0.5;
                    float dimensionalShift = sin(time * 1.5 + vUv.x * vUv.y * 10.0) * 0.5 + 0.5;
                    
                    // Multi-dimensional color shifts
                    vec3 quantumColor = vec3(0.0, 0.8, 1.0) * quantum;
                    vec3 consciousnessColor = vec3(0.8, 0.0, 1.0) * consciousnessWave;
                    vec3 dimensionalColor = vec3(1.0, 0.4, 0.0) * dimensionalShift;
                    
                    color.rgb += (quantumColor + consciousnessColor + dimensionalColor) * 0.4;
                    
                    // Consciousness level affects intensity
                    color.rgb *= (consciousness / 10.0) * 0.5 + 0.5;
                    
                    gl_FragColor = color;
                }
            `
        };
        
        const quantumPass = new THREE.ShaderPass(quantumShader);
        quantumPass.renderToScreen = true;
        this.composer.addPass(quantumPass);
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404080, 0.3);
        this.scene.add(ambientLight);
        
        // Quantum field lights
        const quantumLight1 = new THREE.PointLight(0x00ffff, 1, 100);
        quantumLight1.position.set(20, 20, 20);
        this.scene.add(quantumLight1);
        
        const quantumLight2 = new THREE.PointLight(0xff00ff, 1, 100);
        quantumLight2.position.set(-20, -20, 20);
        this.scene.add(quantumLight2);
        
        const consciousnessLight = new THREE.PointLight(0xffff00, 1, 150);
        consciousnessLight.position.set(0, 0, 30);
        this.scene.add(consciousnessLight);
        
        // Directional lights for depth
        const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
        dirLight1.position.set(10, 10, 5);
        this.scene.add(dirLight1);
        
        const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
        dirLight2.position.set(-10, -10, 5);
        this.scene.add(dirLight2);
    }
    
    createConsciousness() {
        // Create multi-dimensional neural networks
        this.createMultiDimensionalNetworks();
        
        // Create quantum fields
        this.createQuantumFields();
        
        // Create thought bubbles
        this.createThoughtBubbles();
        
        // Create data streams
        this.createDataStreams();
    }
    
    createMultiDimensionalNetworks() {
        // Create 11-dimensional neural network representation
        for (let dim = 0; dim < this.dimensions; dim++) {
            const network = new THREE.Group();
            network.userData = { dimension: dim };
            
            // Create layers for this dimension
            const layerCount = 12;
            const neuronsPerLayer = [1024, 512, 256, 128, 64, 32, 64, 128, 256, 512, 1024, 2048];
            
            for (let layer = 0; layer < layerCount; layer++) {
                const layerGroup = new THREE.Group();
                const neuronCount = neuronsPerLayer[layer];
                const x = (layer - layerCount / 2) * 8;
                const z = dim * 3;
                
                for (let i = 0; i < neuronCount; i++) {
                    const y = (i - neuronCount / 2) * 0.5;
                    
                    // Create neuron with quantum properties
                    const geometry = new THREE.SphereGeometry(0.2, 12, 12);
                    const material = new THREE.MeshPhongMaterial({
                        color: new THREE.Color().setHSL(dim / this.dimensions, 1, 0.7),
                        transparent: true,
                        opacity: 0.8,
                        emissive: new THREE.Color().setHSL(dim / this.dimensions, 1, 0.3)
                    });
                    
                    const neuron = new THREE.Mesh(geometry, material);
                    neuron.position.set(x, y, z);
                    neuron.userData = {
                        dimension: dim,
                        layer: layer,
                        index: i,
                        activation: 0,
                        quantumState: Math.random()
                    };
                    
                    layerGroup.add(neuron);
                }
                
                network.add(layerGroup);
            }
            
            this.neuralNetworks.push(network);
            this.scene.add(network);
        }
    }
    
    createQuantumFields() {
        // Create quantum field particles
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions in 3D space
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;
            
            // Quantum colors
            const hue = Math.random();
            const color = new THREE.Color().setHSL(hue, 1, 0.7);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            sizes[i] = Math.random() * 2 + 1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const quantumField = new THREE.Points(geometry, material);
        this.quantumFields.push(quantumField);
        this.scene.add(quantumField);
    }
    
    createThoughtBubbles() {
        // Create floating thought bubbles
        for (let i = 0; i < 20; i++) {
            const bubble = new THREE.Group();
            
            // Main bubble
            const geometry = new THREE.SphereGeometry(2, 16, 16);
            const material = new THREE.MeshPhongMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.3,
                emissive: 0x004444
            });
            
            const sphere = new THREE.Mesh(geometry, material);
            bubble.add(sphere);
            
            // Inner thoughts
            const innerGeometry = new THREE.SphereGeometry(1, 12, 12);
            const innerMaterial = new THREE.MeshPhongMaterial({
                color: 0xff00ff,
                transparent: true,
                opacity: 0.6,
                emissive: 0x440044
            });
            
            const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
            bubble.add(innerSphere);
            
            // Position randomly
            bubble.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            
            bubble.userData = {
                speed: Math.random() * 0.02 + 0.01,
                direction: new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ).normalize()
            };
            
            this.thoughtBubbles.push(bubble);
            this.scene.add(bubble);
        }
    }
    
    createDataStreams() {
        // Create flowing data streams
        for (let i = 0; i < 10; i++) {
            const stream = new THREE.Group();
            
            // Create stream particles
            const particleCount = 50;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            
            for (let j = 0; j < particleCount; j++) {
                const j3 = j * 3;
                positions[j3] = j * 2;
                positions[j3 + 1] = Math.sin(j * 0.5) * 5;
                positions[j3 + 2] = Math.cos(j * 0.3) * 3;
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const material = new THREE.PointsMaterial({
                color: 0x00ff00,
                size: 3,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            
            const streamParticles = new THREE.Points(geometry, material);
            stream.add(streamParticles);
            
            // Position stream
            stream.position.set(
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 150
            );
            
            stream.userData = {
                speed: Math.random() * 0.05 + 0.02,
                direction: new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                ).normalize()
            };
            
            this.dataStreams.push(stream);
            this.scene.add(stream);
        }
    }
    
    setupEventListeners() {
        // Mouse movement for consciousness interaction
        window.addEventListener('mousemove', (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            // Update consciousness level based on mouse position
            this.consciousnessLevel = 5 + (mouseX + mouseY) * 2;
            this.consciousnessLevel = Math.max(1, Math.min(10, this.consciousnessLevel));
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
            this.camera.position.z = 100 + scrollY * 0.1;
            this.camera.rotation.x = scrollY * 0.001;
        });
    }
    
    updateConsciousness() {
        const elapsedTime = this.clock.getElapsedTime();
        
        // Update neural networks
        this.neuralNetworks.forEach((network, dimIndex) => {
            network.children.forEach((layer, layerIndex) => {
                layer.children.forEach((neuron, neuronIndex) => {
                    const userData = neuron.userData;
                    
                    // Quantum state evolution
                    userData.quantumState += 0.01;
                    userData.activation = Math.sin(elapsedTime * 2 + dimIndex * 0.5 + layerIndex * 0.3 + neuronIndex * 0.1);
                    
                    // Update neuron appearance
                    const intensity = Math.abs(userData.activation);
                    neuron.material.emissive.setHex(0x220022 * intensity);
                    neuron.scale.setScalar(1 + intensity * 0.5);
                    
                    // Quantum color shifting
                    const hue = (dimIndex / this.dimensions + elapsedTime * 0.1) % 1;
                    neuron.material.color.setHSL(hue, 1, 0.7);
                });
            });
        });
        
        // Update quantum fields
        this.quantumFields.forEach(field => {
            field.rotation.x += 0.001;
            field.rotation.y += 0.002;
            field.rotation.z += 0.0005;
        });
        
        // Update thought bubbles
        this.thoughtBubbles.forEach(bubble => {
            const userData = bubble.userData;
            bubble.position.add(userData.direction.clone().multiplyScalar(userData.speed));
            
            // Bounce off boundaries
            if (Math.abs(bubble.position.x) > 100) userData.direction.x *= -1;
            if (Math.abs(bubble.position.y) > 100) userData.direction.y *= -1;
            if (Math.abs(bubble.position.z) > 100) userData.direction.z *= -1;
            
            // Pulsing effect
            const pulse = Math.sin(elapsedTime * 3 + bubble.position.x * 0.01) * 0.5 + 0.5;
            bubble.scale.setScalar(1 + pulse * 0.3);
        });
        
        // Update data streams
        this.dataStreams.forEach(stream => {
            const userData = stream.userData;
            stream.position.add(userData.direction.clone().multiplyScalar(userData.speed));
            
            // Wrap around
            if (stream.position.x > 150) stream.position.x = -150;
            if (stream.position.x < -150) stream.position.x = 150;
            if (stream.position.y > 150) stream.position.y = -150;
            if (stream.position.y < -150) stream.position.y = 150;
            if (stream.position.z > 150) stream.position.z = -150;
            if (stream.position.z < -150) stream.position.z = 150;
        });
    }
    
    updateMetrics() {
        // Update AI consciousness metrics
        const elapsedTime = this.clock.getElapsedTime();
        
        // Neural activity
        const neuralActivityElement = document.getElementById('neural-activity');
        if (neuralActivityElement) {
            const valueElement = neuralActivityElement.querySelector('.metric-value');
            if (valueElement) {
                const activity = 95 + Math.sin(elapsedTime * 2) * 3;
                valueElement.textContent = `${activity.toFixed(1)}%`;
            }
        }
        
        // Quantum coherence
        const quantumCoherenceElement = document.getElementById('quantum-coherence');
        if (quantumCoherenceElement) {
            const valueElement = quantumCoherenceElement.querySelector('.metric-value');
            if (valueElement) {
                const coherence = 0.8 + Math.sin(elapsedTime * 1.5) * 0.1;
                valueElement.textContent = coherence.toFixed(3);
            }
        }
        
        // AI Intelligence (always infinite)
        const aiIntelligenceElement = document.getElementById('ai-intelligence');
        if (aiIntelligenceElement) {
            const valueElement = aiIntelligenceElement.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = '∞';
            }
        }
        
        // Data throughput
        const dataThroughputElement = document.getElementById('data-throughput');
        if (dataThroughputElement) {
            const valueElement = dataThroughputElement.querySelector('.metric-value');
            if (valueElement) {
                const throughput = 800 + Math.sin(elapsedTime * 3) * 100;
                valueElement.textContent = `${Math.round(throughput)}TB/s`;
            }
        }
        
        // Consciousness level
        const consciousnessLevelElement = document.getElementById('consciousness-level');
        if (consciousnessLevelElement) {
            const valueElement = consciousnessLevelElement.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = `Level ${Math.round(this.consciousnessLevel)}`;
            }
        }
        
        // Dimensional awareness
        const dimensionalAwarenessElement = document.getElementById('dimensional-awareness');
        if (dimensionalAwarenessElement) {
            const valueElement = dimensionalAwarenessElement.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = `${this.dimensions}D`;
            }
        }
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const elapsedTime = this.clock.getElapsedTime();
        
        // Update consciousness
        this.updateConsciousness();
        
        // Update metrics
        this.updateMetrics();
        
        // Camera movement
        this.camera.position.x += Math.sin(elapsedTime * 0.5) * 0.1;
        this.camera.position.y += Math.cos(elapsedTime * 0.3) * 0.1;
        this.camera.lookAt(this.scene.position);
        
        // Update post-processing uniforms
        if (this.composer.passes[1].uniforms) {
            this.composer.passes[1].uniforms.time.value = elapsedTime;
            this.composer.passes[1].uniforms.consciousness.value = this.consciousnessLevel;
            this.composer.passes[1].uniforms.dimensions.value = this.dimensions;
        }
        
        // Render with post-processing
        this.composer.render();
        
        // Update FPS counter
        this.frameCount++;
        const currentTime = performance.now();
        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
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
    new InsaneAIConsciousness();
});
