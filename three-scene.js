/**
 * CRAZY 3D Interactive Scene for Vinit's Bio Page
 * Features: Floating geometric shapes, particle systems, mouse interaction, glitch effects
 */

class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mouse = { x: 0, y: 0 };
        this.shapes = [];
        this.particles = [];
        this.clock = new THREE.Clock();
        this.isGlitching = false;
        
        this.init();
        this.createShapes();
        this.createParticleSystem();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0b0b0f, 50, 200);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 50;
        
        // Renderer setup
        const canvas = document.getElementById('three-canvas');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0b0b0f, 0);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xa3a3ff, 1);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);
        
        const pointLight = new THREE.PointLight(0x6366f1, 0.8, 100);
        pointLight.position.set(-10, -10, 10);
        this.scene.add(pointLight);
    }
    
    createShapes() {
        // Create floating geometric shapes
        const geometries = [
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.SphereGeometry(1.5, 32, 32),
            new THREE.ConeGeometry(1.5, 3, 8),
            new THREE.TorusGeometry(1.5, 0.5, 16, 100),
            new THREE.OctahedronGeometry(1.5),
            new THREE.TetrahedronGeometry(2)
        ];
        
        const materials = [
            new THREE.MeshPhongMaterial({ 
                color: 0xa3a3ff, 
                transparent: true, 
                opacity: 0.8,
                wireframe: false 
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x6366f1, 
                transparent: true, 
                opacity: 0.6,
                wireframe: true 
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0xff6b6b, 
                transparent: true, 
                opacity: 0.7,
                emissive: 0x220000 
            })
        ];
        
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const shape = new THREE.Mesh(geometry, material);
            
            // Random positioning
            shape.position.x = (Math.random() - 0.5) * 100;
            shape.position.y = (Math.random() - 0.5) * 100;
            shape.position.z = (Math.random() - 0.5) * 100;
            
            // Random rotation
            shape.rotation.x = Math.random() * Math.PI;
            shape.rotation.y = Math.random() * Math.PI;
            shape.rotation.z = Math.random() * Math.PI;
            
            // Animation properties
            shape.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.01 + 0.005,
                floatAmplitude: Math.random() * 2 + 1,
                originalY: shape.position.y
            };
            
            this.shapes.push(shape);
            this.scene.add(shape);
        }
    }
    
    createParticleSystem() {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;
            
            // Random colors (accent colors)
            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.2 + 0.6, 0.8, 0.6);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
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
        });
        
        // Click interaction
        window.addEventListener('click', () => {
            this.triggerGlitchEffect();
        });
        
        // Scroll interaction
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            this.camera.position.z = 50 + scrollY * 0.1;
            this.camera.rotation.x = scrollY * 0.001;
        });
    }
    
    triggerGlitchEffect() {
        if (this.isGlitching) return;
        
        this.isGlitching = true;
        const glitchOverlay = document.getElementById('glitch-overlay');
        
        // Random glitch colors
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        // Create glitch effect
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                glitchOverlay.style.background = colors[Math.floor(Math.random() * colors.length)];
                glitchOverlay.style.opacity = '0.1';
                
                setTimeout(() => {
                    glitchOverlay.style.opacity = '0';
                }, 50);
            }, i * 100);
        }
        
        // Shake camera
        const originalPosition = this.camera.position.clone();
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.camera.position.x = originalPosition.x + (Math.random() - 0.5) * 2;
                this.camera.position.y = originalPosition.y + (Math.random() - 0.5) * 2;
            }, i * 50);
        }
        
        setTimeout(() => {
            this.camera.position.copy(originalPosition);
            this.isGlitching = false;
        }, 1000);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const elapsedTime = this.clock.getElapsedTime();
        
        // Animate shapes
        this.shapes.forEach((shape, index) => {
            // Rotation
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            // Floating motion
            shape.position.y = shape.userData.originalY + 
                Math.sin(elapsedTime * shape.userData.floatSpeed + index) * shape.userData.floatAmplitude;
            
            // Mouse interaction
            const mouseInfluence = 0.1;
            shape.position.x += (this.mouse.x * 10 - shape.position.x) * mouseInfluence;
            shape.position.z += (this.mouse.y * 10 - shape.position.z) * mouseInfluence;
            
            // Pulsing effect
            const scale = 1 + Math.sin(elapsedTime * 2 + index) * 0.1;
            shape.scale.setScalar(scale);
        });
        
        // Animate particles
        if (this.particleSystem) {
            this.particleSystem.rotation.y += 0.001;
            this.particleSystem.rotation.x += 0.0005;
            
            // Mouse interaction with particles
            const positions = this.particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += (this.mouse.x * 0.1);
                positions[i + 1] += (this.mouse.y * 0.1);
            }
            this.particleSystem.geometry.attributes.position.needsUpdate = true;
        }
        
        // Camera movement
        this.camera.position.x += (this.mouse.x * 5 - this.camera.position.x) * 0.05;
        this.camera.position.y += (this.mouse.y * 5 - this.camera.position.y) * 0.05;
        this.camera.lookAt(this.scene.position);
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThreeScene();
});
