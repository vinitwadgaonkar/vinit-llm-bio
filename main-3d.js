/**
 * INSANE 3D MAIN SCENE
 * Features: Mind-blowing 3D animations, particle systems, interactive elements
 */

class Main3DScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.clock = new THREE.Clock();
        
        // 3D Objects
        this.geometries = [];
        this.materials = [];
        this.meshes = [];
        this.particles = [];
        this.lights = [];
        
        // Animation properties
        this.mouse = { x: 0, y: 0 };
        this.isMouseDown = false;
        this.animationId = null;
        
        // Performance
        this.frameCount = 0;
        this.lastTime = 0;
        this.fps = 60;
        
        this.init();
        this.createScene();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0b0b0f);
        this.scene.fog = new THREE.Fog(0x0b0b0f, 50, 200);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 0, 50);
        
        // Renderer setup
        const canvas = document.getElementById('main-canvas');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0b0b0f, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Post-processing
        this.setupPostProcessing();
        
        // Lighting
        this.setupLighting();
    }
    
    setupPostProcessing() {
        this.composer = new THREE.EffectComposer(this.renderer);
        
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        
        // Custom shader for insane effects
        const insaneShader = {
            uniforms: {
                tDiffuse: { value: null },
                time: { value: 0.0 },
                mouse: { value: new THREE.Vector2(0, 0) },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
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
                uniform vec2 mouse;
                uniform vec2 resolution;
                varying vec2 vUv;
                
                void main() {
                    vec4 color = texture2D(tDiffuse, vUv);
                    
                    // Insane distortion effects
                    vec2 uv = vUv;
                    uv.x += sin(uv.y * 10.0 + time * 2.0) * 0.01;
                    uv.y += cos(uv.x * 10.0 + time * 1.5) * 0.01;
                    
                    // Color shifting
                    float r = color.r + sin(time * 3.0 + uv.x * 5.0) * 0.1;
                    float g = color.g + cos(time * 2.0 + uv.y * 5.0) * 0.1;
                    float b = color.b + sin(time * 4.0 + (uv.x + uv.y) * 3.0) * 0.1;
                    
                    // Mouse interaction
                    float mouseDist = distance(uv, mouse);
                    float mouseEffect = 1.0 - smoothstep(0.0, 0.3, mouseDist);
                    
                    r += mouseEffect * 0.3;
                    g += mouseEffect * 0.2;
                    b += mouseEffect * 0.4;
                    
                    // Glitch effect
                    if (sin(time * 10.0) > 0.9) {
                        r = 1.0 - r;
                        g = 1.0 - g;
                    }
                    
                    gl_FragColor = vec4(r, g, b, color.a);
                }
            `
        };
        
        const insanePass = new THREE.ShaderPass(insaneShader);
        insanePass.renderToScreen = true;
        this.composer.addPass(insanePass);
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404080, 0.3);
        this.scene.add(ambientLight);
        
        // Directional lights
        const light1 = new THREE.DirectionalLight(0xa3a3ff, 1);
        light1.position.set(10, 10, 5);
        light1.castShadow = true;
        this.scene.add(light1);
        
        const light2 = new THREE.DirectionalLight(0x6366f1, 0.8);
        light2.position.set(-10, -10, 5);
        this.scene.add(light2);
        
        // Point lights for dynamic effects
        const pointLight1 = new THREE.PointLight(0xff6b6b, 1, 100);
        pointLight1.position.set(20, 20, 20);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x4ecdc4, 1, 100);
        pointLight2.position.set(-20, -20, 20);
        this.scene.add(pointLight2);
        
        this.lights.push(light1, light2, pointLight1, pointLight2);
    }
    
    createScene() {
        // Create insane geometries
        this.createGeometries();
        this.createMaterials();
        this.createMeshes();
        this.createParticleSystem();
    }
    
    createGeometries() {
        // Create various geometries
        this.geometries = [
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.SphereGeometry(1.5, 32, 32),
            new THREE.ConeGeometry(1, 3, 8),
            new THREE.TorusGeometry(2, 0.5, 16, 100),
            new THREE.OctahedronGeometry(1.5),
            new THREE.TetrahedronGeometry(2),
            new THREE.IcosahedronGeometry(1.5),
            new THREE.DodecahedronGeometry(1.5)
        ];
    }
    
    createMaterials() {
        // Create insane materials
        this.materials = [
            new THREE.MeshPhongMaterial({ 
                color: 0xa3a3ff, 
                transparent: true, 
                opacity: 0.8,
                emissive: 0x220022
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x6366f1, 
                transparent: true, 
                opacity: 0.7,
                emissive: 0x110033
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0xff6b6b, 
                transparent: true, 
                opacity: 0.6,
                emissive: 0x330011
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0x4ecdc4, 
                transparent: true, 
                opacity: 0.5,
                emissive: 0x113300
            }),
            new THREE.MeshPhongMaterial({ 
                color: 0xffe66d, 
                transparent: true, 
                opacity: 0.4,
                emissive: 0x333300
            })
        ];
    }
    
    createMeshes() {
        // Create meshes with random positions
        for (let i = 0; i < 20; i++) {
            const geometry = this.geometries[Math.floor(Math.random() * this.geometries.length)];
            const material = this.materials[Math.floor(Math.random() * this.materials.length)];
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Random position
            mesh.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            
            // Random rotation
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            // Random scale
            const scale = Math.random() * 2 + 0.5;
            mesh.scale.setScalar(scale);
            
            // User data for animation
            mesh.userData = {
                originalPosition: mesh.position.clone(),
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.02 + 0.01,
                floatAmplitude: Math.random() * 5 + 2
            };
            
            this.meshes.push(mesh);
            this.scene.add(mesh);
        }
    }
    
    createParticleSystem() {
        // Create insane particle system
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Random positions
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;
            
            // Random colors
            const color = new THREE.Color();
            color.setHSL(Math.random(), 1, 0.7);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
            
            sizes[i] = Math.random() * 3 + 1;
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
        
        const particleSystem = new THREE.Points(geometry, material);
        this.particles.push(particleSystem);
        this.scene.add(particleSystem);
    }
    
    setupEventListeners() {
        // Mouse movement
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / window.innerWidth;
            this.mouse.y = 1 - (event.clientY / window.innerHeight);
        });
        
        // Mouse down/up
        window.addEventListener('mousedown', () => {
            this.isMouseDown = true;
        });
        
        window.addEventListener('mouseup', () => {
            this.isMouseDown = false;
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
            this.camera.position.z = 50 + scrollY * 0.1;
            this.camera.rotation.x = scrollY * 0.001;
        });
    }
    
    updateMeshes() {
        const elapsedTime = this.clock.getElapsedTime();
        
        this.meshes.forEach((mesh, index) => {
            const userData = mesh.userData;
            
            // Rotation
            mesh.rotation.x += userData.rotationSpeed.x;
            mesh.rotation.y += userData.rotationSpeed.y;
            mesh.rotation.z += userData.rotationSpeed.z;
            
            // Floating animation
            mesh.position.y = userData.originalPosition.y + 
                Math.sin(elapsedTime * userData.floatSpeed + index) * userData.floatAmplitude;
            
            // Mouse interaction
            if (this.isMouseDown) {
                const mouseInfluence = 0.1;
                mesh.position.x += (this.mouse.x - 0.5) * mouseInfluence;
                mesh.position.y += (this.mouse.y - 0.5) * mouseInfluence;
            }
            
            // Color pulsing
            const intensity = Math.sin(elapsedTime * 2 + index) * 0.5 + 0.5;
            mesh.material.emissive.setHex(0x220022 * intensity);
        });
    }
    
    updateParticles() {
        const elapsedTime = this.clock.getElapsedTime();
        
        this.particles.forEach(particleSystem => {
            particleSystem.rotation.x += 0.001;
            particleSystem.rotation.y += 0.002;
            particleSystem.rotation.z += 0.0005;
            
            // Update particle positions
            const positions = particleSystem.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(elapsedTime + i * 0.01) * 0.1;
            }
            particleSystem.geometry.attributes.position.needsUpdate = true;
        });
    }
    
    updateLights() {
        const elapsedTime = this.clock.getElapsedTime();
        
        this.lights.forEach((light, index) => {
            if (light.type === 'PointLight') {
                light.position.x = Math.sin(elapsedTime * 0.5 + index) * 20;
                light.position.y = Math.cos(elapsedTime * 0.3 + index) * 20;
                light.position.z = Math.sin(elapsedTime * 0.7 + index) * 10 + 20;
            }
        });
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        const elapsedTime = this.clock.getElapsedTime();
        
        // Update objects
        this.updateMeshes();
        this.updateParticles();
        this.updateLights();
        
        // Camera movement
        this.camera.position.x += (this.mouse.x * 10 - this.camera.position.x) * 0.02;
        this.camera.position.y += (this.mouse.y * 10 - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);
        
        // Update post-processing uniforms
        if (this.composer.passes[1].uniforms) {
            this.composer.passes[1].uniforms.time.value = elapsedTime;
            this.composer.passes[1].uniforms.mouse.value.set(this.mouse.x, this.mouse.y);
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
    new Main3DScene();
});
