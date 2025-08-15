class PointVisualizer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.points = null;
        this.controls = null;
        
        this.pointRadius = 0.03;
        this.numPoints = 5000;
        this.shape = 0.5;
        this.rippleIndex = 0;
        this.currentMode = 'sphere'; // Track current visualization mode
        this.blobIndex = 0; // Track current blob shape
        this.currentBlobType = 'distortedSphere'; // Track current blob type
        this.waveIndex = 0; // Track current wave shape
        this.currentWaveType = 'sineWave'; // Track current wave type
        this.isMouseDown = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cameraDistance = 50;
        this.cameraRotationX = 0;
        this.cameraRotationY = 0;
        
        this.init();
        this.setupControls();
        this.animate();
    }
    
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, this.cameraDistance);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth - 250, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        
        const container = document.getElementById('canvas-container');
        container.appendChild(this.renderer.domElement);
        
        // Add event listeners
        this.renderer.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.renderer.domElement.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.renderer.domElement.addEventListener('wheel', this.onWheel.bind(this));
        
        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Generate initial points
        this.generatePoints();
    }
    
    generatePoints() {
        // Set mode to sphere
        this.currentMode = 'sphere';
        
        // Remove existing points
        if (this.points) {
            this.scene.remove(this.points);
        }
        
        // Create a group to hold all the spheres
        this.points = new THREE.Group();
        
        // Create sphere geometry and material once for efficiency
        const sphereGeometry = new THREE.SphereGeometry(this.pointRadius, 8, 6);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        
        // Cycle through different blob variations only when explicitly requested
        const blobVariations = [
            'distortedSphere', 'organicBlob', 'crystallineBlob', 'amoebaBlob', 
            'fractalBlob', 'bubbleBlob', 'tentacleBlob', 'cellularBlob',
            'vortexBlob', 'nebulaBlob'
        ];
        const currentVariation = blobVariations[this.blobIndex % blobVariations.length];
        
        // Store the current blob type before incrementing
        this.currentBlobType = currentVariation;
        
        console.log('Generating blob variation:', currentVariation);
        
        for (let i = 0; i < this.numPoints; i++) {
            let x, y, z;
            
            switch (currentVariation) {
                case 'distortedSphere':
                    ({ x, y, z } = this.generateDistortedSpherePoint(i, this.numPoints));
                    break;
                case 'organicBlob':
                    ({ x, y, z } = this.generateOrganicBlob(i, this.numPoints));
                    break;
                case 'crystallineBlob':
                    ({ x, y, z } = this.generateCrystallineBlob(i, this.numPoints));
                    break;
                case 'amoebaBlob':
                    ({ x, y, z } = this.generateAmoebaBlob(i, this.numPoints));
                    break;
                case 'fractalBlob':
                    ({ x, y, z } = this.generateFractalBlob(i, this.numPoints));
                    break;
                case 'bubbleBlob':
                    ({ x, y, z } = this.generateBubbleBlob(i, this.numPoints));
                    break;
                case 'tentacleBlob':
                    ({ x, y, z } = this.generateTentacleBlob(i, this.numPoints));
                    break;
                case 'cellularBlob':
                    ({ x, y, z } = this.generateCellularBlob(i, this.numPoints));
                    break;
                case 'vortexBlob':
                    ({ x, y, z } = this.generateVortexBlob(i, this.numPoints));
                    break;
                case 'nebulaBlob':
                    ({ x, y, z } = this.generateNebulaBlob(i, this.numPoints));
                    break;
            }
            
            // Create individual sphere mesh
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(x, y, z);
            this.points.add(sphere);
        }
        
        this.scene.add(this.points);
        
        // Increment blob index for next variation
        this.blobIndex++;
    }
    
    generateWaves() {
        // Set mode to waves
        this.currentMode = 'waves';
        
        // Remove existing points
        if (this.points) {
            this.scene.remove(this.points);
        }
        
        // Create a group to hold all the spheres
        this.points = new THREE.Group();
        
        // Create sphere geometry and material once for efficiency
        const sphereGeometry = new THREE.SphereGeometry(this.pointRadius, 8, 6);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        
        // Cycle through different wave variations based on shape slider
        const waveVariations = [
            'sineWave', 'cosineWave', 'squareWave', 'triangleWave', 'sawtoothWave',
            'doubleWave', 'interferenceWave', 'standingWave', 'travelingWave', 'modulatedWave',
            'harmonicWave', 'chaoticWave', 'spiralWave', 'radialWave', 'concentricWave',
            'crossWave', 'organicWave', 'geometricWave', 'nebulaWave', 'cosmicWave'
        ];
        const currentVariation = waveVariations[this.waveIndex % waveVariations.length];
        
        // Store the current wave type before any potential index changes
        this.currentWaveType = currentVariation;
        
        console.log('Generating wave variation:', currentVariation);
        
        for (let i = 0; i < this.numPoints; i++) {
            let x, y, z;
            
            switch (currentVariation) {
                case 'sineWave':
                    ({ x, y, z } = this.generateSineWave(i, this.numPoints));
                    break;
                case 'cosineWave':
                    ({ x, y, z } = this.generateCosineWave(i, this.numPoints));
                    break;
                case 'squareWave':
                    ({ x, y, z } = this.generateSquareWave(i, this.numPoints));
                    break;
                case 'triangleWave':
                    ({ x, y, z } = this.generateTriangleWave(i, this.numPoints));
                    break;
                case 'sawtoothWave':
                    ({ x, y, z } = this.generateSawtoothWave(i, this.numPoints));
                    break;
                case 'doubleWave':
                    ({ x, y, z } = this.generateDoubleWave(i, this.numPoints));
                    break;
                case 'interferenceWave':
                    ({ x, y, z } = this.generateInterferenceWave(i, this.numPoints));
                    break;
                case 'standingWave':
                    ({ x, y, z } = this.generateStandingWave(i, this.numPoints));
                    break;
                case 'travelingWave':
                    ({ x, y, z } = this.generateTravelingWave(i, this.numPoints));
                    break;
                case 'modulatedWave':
                    ({ x, y, z } = this.generateModulatedWave(i, this.numPoints));
                    break;
                case 'harmonicWave':
                    ({ x, y, z } = this.generateHarmonicWave(i, this.numPoints));
                    break;
                case 'chaoticWave':
                    ({ x, y, z } = this.generateChaoticWave(i, this.numPoints));
                    break;
                case 'spiralWave':
                    ({ x, y, z } = this.generateSpiralWave(i, this.numPoints));
                    break;
                case 'radialWave':
                    ({ x, y, z } = this.generateRadialWave(i, this.numPoints));
                    break;
                case 'concentricWave':
                    ({ x, y, z } = this.generateConcentricWave(i, this.numPoints));
                    break;
                case 'crossWave':
                    ({ x, y, z } = this.generateCrossWave(i, this.numPoints));
                    break;
                case 'organicWave':
                    ({ x, y, z } = this.generateOrganicWave(i, this.numPoints));
                    break;
                case 'geometricWave':
                    ({ x, y, z } = this.generateGeometricWave(i, this.numPoints));
                    break;
                case 'nebulaWave':
                    ({ x, y, z } = this.generateNebulaWave(i, this.numPoints));
                    break;
                case 'cosmicWave':
                    ({ x, y, z } = this.generateCosmicWave(i, this.numPoints));
                    break;
            }
            
            // Create individual sphere mesh
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(x, y, z);
            this.points.add(sphere);
        }
        
        this.scene.add(this.points);
    }
    
    generateSineWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const x = Math.sin(z * 0.5) * 8; // Wave amplitude
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateCosineWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const x = Math.cos(z * 0.5) * 8; // Cosine wave amplitude
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateSquareWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const x = Math.sign(Math.sin(z * 0.5)) * 6; // Square wave
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateTriangleWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const phase = (z * 0.5) % (2 * Math.PI);
        const x = (phase < Math.PI ? phase : 2 * Math.PI - phase) * 2 - Math.PI; // Triangle wave
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateSawtoothWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const x = ((z * 0.5) % (2 * Math.PI) - Math.PI) * 1.5; // Sawtooth wave
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateDoubleWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const wave1 = Math.sin(z * 0.5) * 4;
        const wave2 = Math.sin(z * 0.8) * 3;
        const x = wave1 + wave2; // Combined waves
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateInterferenceWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const wave1 = Math.sin(z * 0.8) * 5;
        const wave2 = Math.sin(z * 1.2) * 4;
        const interference = Math.sin(z * 0.2) * 2;
        const x = wave1 + wave2 + interference;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateStandingWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const standing = Math.sin(z * 0.6) * Math.cos(z * 0.2) * 6;
        const x = standing;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateTravelingWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const traveling = Math.sin(z * 0.4 + z * 0.1) * 6;
        const x = traveling;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateModulatedWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const carrier = Math.sin(z * 0.8) * 5;
        const modulation = Math.sin(z * 0.2) * 2;
        const x = carrier * (1 + modulation * 0.5);
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateHarmonicWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const fundamental = Math.sin(z * 0.4) * 4;
        const harmonic1 = Math.sin(z * 0.8) * 2;
        const harmonic2 = Math.sin(z * 1.2) * 1.5;
        const x = fundamental + harmonic1 + harmonic2;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateChaoticWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const chaotic = Math.sin(z * 0.7) * Math.cos(z * 1.1) * 5;
        const x = chaotic + Math.sin(z * 0.9) * 2;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateSpiralWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const spiral = Math.sin(z * 0.6) * Math.cos(z * 0.3) * 6;
        const x = spiral + Math.sin(z * 0.4) * 2;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateRadialWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const radial = Math.sin(z * 0.5) * 5;
        const x = radial + Math.sin(z * 0.8) * 2;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateConcentricWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const concentric = Math.sin(z * 0.7) * 4;
        const x = concentric + Math.sin(z * 1.1) * 2;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateCrossWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const x = Math.sin(z * 0.4) * 5;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateOrganicWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const organic = Math.sin(z * 0.5) * Math.cos(z * 0.3) * 5;
        const x = organic + Math.sin(z * 0.7) * 2;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateGeometricWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const geometric = Math.floor(z * 0.2) * 0.8;
        const x = Math.sin(z * 0.4) * 4 + geometric;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateNebulaWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const nebula = Math.sin(z * 0.6) * Math.cos(z * 0.4) * 5;
        const x = nebula + Math.sin(z * 0.8) * 2;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateCosmicWave(index, totalPoints) {
        // Create scattered points across multiple flowing waveforms
        const t = index / totalPoints;
        const z = (t - 0.5) * 20; // Z range from -10 to 10
        const cosmic1 = Math.sin(z * 0.7) * 4;
        const cosmic2 = Math.cos(z * 0.9) * 3;
        const cosmic3 = Math.sin(z * 1.1) * 2;
        const x = cosmic1 + cosmic2 + cosmic3;
        const y = (Math.random() - 0.5) * 16; // Scatter Y across multiple levels
        
        return { x, y, z };
    }
    
    generateCurrentWaveShape() {
        // Regenerate the current wave shape without cycling to the next one
        // Remove existing points
        if (this.points) {
            this.scene.remove(this.points);
        }
        
        // Create a group to hold all the spheres
        this.points = new THREE.Group();
        
        // Create sphere geometry and material once for efficiency
        const sphereGeometry = new THREE.SphereGeometry(this.pointRadius, 8, 6);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        
        // Get current wave type without incrementing index
        const currentVariation = this.currentWaveType;
        
        console.log('Regenerating wave variation:', currentVariation);
        
        for (let i = 0; i < this.numPoints; i++) {
            let x, y, z;
            
            switch (currentVariation) {
                case 'sineWave':
                    ({ x, y, z } = this.generateSineWave(i, this.numPoints));
                    break;
                case 'cosineWave':
                    ({ x, y, z } = this.generateCosineWave(i, this.numPoints));
                    break;
                case 'squareWave':
                    ({ x, y, z } = this.generateSquareWave(i, this.numPoints));
                    break;
                case 'triangleWave':
                    ({ x, y, z } = this.generateTriangleWave(i, this.numPoints));
                    break;
                case 'sawtoothWave':
                    ({ x, y, z } = this.generateSawtoothWave(i, this.numPoints));
                    break;
                case 'doubleWave':
                    ({ x, y, z } = this.generateDoubleWave(i, this.numPoints));
                    break;
                case 'interferenceWave':
                    ({ x, y, z } = this.generateInterferenceWave(i, this.numPoints));
                    break;
                case 'standingWave':
                    ({ x, y, z } = this.generateStandingWave(i, this.numPoints));
                    break;
                case 'travelingWave':
                    ({ x, y, z } = this.generateTravelingWave(i, this.numPoints));
                    break;
                case 'modulatedWave':
                    ({ x, y, z } = this.generateModulatedWave(i, this.numPoints));
                    break;
                case 'harmonicWave':
                    ({ x, y, z } = this.generateHarmonicWave(i, this.numPoints));
                    break;
                case 'chaoticWave':
                    ({ x, y, z } = this.generateChaoticWave(i, this.numPoints));
                    break;
                case 'spiralWave':
                    ({ x, y, z } = this.generateSpiralWave(i, this.numPoints));
                    break;
                case 'radialWave':
                    ({ x, y, z } = this.generateRadialWave(i, this.numPoints));
                    break;
                case 'concentricWave':
                    ({ x, y, z } = this.generateConcentricWave(i, this.numPoints));
                    break;
                case 'crossWave':
                    ({ x, y, z } = this.generateCrossWave(i, this.numPoints));
                    break;
                case 'organicWave':
                    ({ x, y, z } = this.generateOrganicWave(i, this.numPoints));
                    break;
                case 'geometricWave':
                    ({ x, y, z } = this.generateGeometricWave(i, this.numPoints));
                    break;
                case 'nebulaWave':
                    ({ x, y, z } = this.generateNebulaWave(i, this.numPoints));
                    break;
                case 'cosmicWave':
                    ({ x, y, z } = this.generateCosmicWave(i, this.numPoints));
                    break;
            }
            
            // Create individual sphere mesh
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(x, y, z);
            this.points.add(sphere);
        }
        
        this.scene.add(this.points);
    }
    
    getCurrentBlobType() {
        // Get the current blob type based on blob index
        const blobVariations = [
            'distortedSphere', 'organicBlob', 'crystallineBlob', 'amoebaBlob', 
            'fractalBlob', 'bubbleBlob', 'tentacleBlob', 'cellularBlob',
            'vortexBlob', 'nebulaBlob'
        ];
        return blobVariations[this.blobIndex % blobVariations.length];
    }
    
    generateCurrentBlobShape() {
        // Regenerate the current blob shape without cycling to the next one
        // Remove existing points
        if (this.points) {
            this.scene.remove(this.points);
        }
        
        // Create a group to hold all the spheres
        this.points = new THREE.Group();
        
        // Create sphere geometry and material once for efficiency
        const sphereGeometry = new THREE.SphereGeometry(this.pointRadius, 8, 6);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        
        // Get current blob type without incrementing index
        const currentVariation = this.currentBlobType;
        
        console.log('Regenerating blob variation:', currentVariation);
        
        for (let i = 0; i < this.numPoints; i++) {
            let x, y, z;
            
            switch (currentVariation) {
                case 'distortedSphere':
                    ({ x, y, z } = this.generateDistortedSpherePoint(i, this.numPoints));
                    break;
                case 'organicBlob':
                    ({ x, y, z } = this.generateOrganicBlob(i, this.numPoints));
                    break;
                case 'crystallineBlob':
                    ({ x, y, z } = this.generateCrystallineBlob(i, this.numPoints));
                    break;
                case 'amoebaBlob':
                    ({ x, y, z } = this.generateAmoebaBlob(i, this.numPoints));
                    break;
                case 'fractalBlob':
                    ({ x, y, z } = this.generateFractalBlob(i, this.numPoints));
                    break;
                case 'bubbleBlob':
                    ({ x, y, z } = this.generateBubbleBlob(i, this.numPoints));
                    break;
                case 'tentacleBlob':
                    ({ x, y, z } = this.generateTentacleBlob(i, this.numPoints));
                    break;
                case 'cellularBlob':
                    ({ x, y, z } = this.generateCellularBlob(i, this.numPoints));
                    break;
                case 'vortexBlob':
                    ({ x, y, z } = this.generateVortexBlob(i, this.numPoints));
                    break;
                case 'nebulaBlob':
                    ({ x, y, z } = this.generateNebulaBlob(i, this.numPoints));
                    break;
            }
            
            // Create individual sphere mesh
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(x, y, z);
            this.points.add(sphere);
        }
        
        this.scene.add(this.points);
    }
    
    regenerateCurrentMode() {
        // Regenerate based on current mode without cycling shapes
        if (this.currentMode === 'ripples') {
            this.generateRipplePoints(false); // false = don't cycle to next variation
        } else if (this.currentMode === 'waves') {
            this.generateCurrentWaveShape(); // Regenerate current wave type
        } else {
            this.generatePoints();
        }
    }
    
    generateRipplePoints(cycle = true) {
        // Set mode to ripples
        this.currentMode = 'ripples';
        
        // Remove existing points
        if (this.points) {
            this.scene.remove(this.points);
        }
        
        // Create a group to hold all the spheres
        this.points = new THREE.Group();
        
        // Create sphere geometry and material once for efficiency
        const sphereGeometry = new THREE.SphereGeometry(this.pointRadius, 8, 6);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        
        // Cycle through different ripple variations only when explicitly requested
        const rippleVariations = [
            'concentric', 'spiral', 'wave', 'doubleRing', 'crossedRings',
            'spiralCluster', 'waveCluster', 'organicRings', 'geometricRings', 'nebulaRings',
            'variableWidth', 'taperedRings', 'bulgingRings', 'constrictedRings', 'wavyWidth',
            'spiralWidth', 'organicWidth', 'geometricWidth', 'nebulaWidth', 'cosmicWidth'
        ];
        const currentVariation = rippleVariations[this.rippleIndex % rippleVariations.length];
        
        console.log('Generating ripple variation:', currentVariation);
        
        for (let i = 0; i < this.numPoints; i++) {
            let x, y, z;
            
            switch (currentVariation) {
                case 'concentric':
                    ({ x, y, z } = this.generateConcentricRipple(i, this.numPoints));
                    break;
                case 'spiral':
                    ({ x, y, z } = this.generateSpiralRipple(i, this.numPoints));
                    break;
                case 'wave':
                    ({ x, y, z } = this.generateWaveRipple(i, this.numPoints));
                    break;
                case 'doubleRing':
                    ({ x, y, z } = this.generateDoubleRingRipple(i, this.numPoints));
                    break;
                case 'crossedRings':
                    ({ x, y, z } = this.generateCrossedRingsRipple(i, this.numPoints));
                    break;
                case 'spiralCluster':
                    ({ x, y, z } = this.generateSpiralClusterRipple(i, this.numPoints));
                    break;
                case 'waveCluster':
                    ({ x, y, z } = this.generateWaveClusterRipple(i, this.numPoints));
                    break;
                case 'organicRings':
                    ({ x, y, z } = this.generateOrganicRingsRipple(i, this.numPoints));
                    break;
                case 'geometricRings':
                    ({ x, y, z } = this.generateGeometricRingsRipple(i, this.numPoints));
                    break;
                case 'nebulaRings':
                    ({ x, y, z } = this.generateNebulaRingsRipple(i, this.numPoints));
                    break;
                case 'variableWidth':
                    ({ x, y, z } = this.generateVariableWidthRipple(i, this.numPoints));
                    break;
                case 'taperedRings':
                    ({ x, y, z } = this.generateTaperedRingsRipple(i, this.numPoints));
                    break;
                case 'bulgingRings':
                    ({ x, y, z } = this.generateBulgingRingsRipple(i, this.numPoints));
                    break;
                case 'constrictedRings':
                    ({ x, y, z } = this.generateConstrictedRingsRipple(i, this.numPoints));
                    break;
                case 'wavyWidth':
                    ({ x, y, z } = this.generateWavyWidthRipple(i, this.numPoints));
                    break;
                case 'spiralWidth':
                    ({ x, y, z } = this.generateSpiralWidthRipple(i, this.numPoints));
                    break;
                case 'organicWidth':
                    ({ x, y, z } = this.generateOrganicWidthRipple(i, this.numPoints));
                    break;
                case 'geometricWidth':
                    ({ x, y, z } = this.generateGeometricWidthRipple(i, this.numPoints));
                    break;
                case 'nebulaWidth':
                    ({ x, y, z } = this.generateNebulaWidthRipple(i, this.numPoints));
                    break;
                case 'cosmicWidth':
                    ({ x, y, z } = this.generateCosmicWidthRipple(i, this.numPoints));
                    break;
            }
            
            // Create individual sphere mesh
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(x, y, z);
            this.points.add(sphere);
        }
        
        this.scene.add(this.points);
        
        // Only increment ripple index when cycling to new shapes
        if (cycle) {
            this.rippleIndex++;
        }
    }
    
    generateConcentricRipple(index, totalPoints) {
        // Create proper donut shapes with torus cross-section
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 12 + t * 6; // Rings from radius 12 to 18
        
        // Add some randomness to make it look more natural
        const radiusVariation = (Math.random() - 0.5) * 0.8;
        const angleVariation = (Math.random() - 0.5) * 0.1;
        
        // Create donut cross-section (thicker in middle, thinner at edges)
        const crossSectionAngle = Math.random() * Math.PI * 2;
        const crossSectionRadius = 3; // Radius of the donut's cross-section
        const crossSectionVariation = this.shape * 2; // Shape controls cross-section variation
        
        // Vary the cross-section radius to create organic donut shape
        const radiusVariationFactor = Math.sin(crossSectionAngle * 2) * crossSectionVariation;
        const finalCrossSectionRadius = crossSectionRadius + radiusVariationFactor;
        
        // Position points in a donut cross-section
        const x = Math.cos(angle + angleVariation) * (radius + radiusVariation) + 
                  Math.cos(angle + angleVariation) * Math.cos(crossSectionAngle) * finalCrossSectionRadius;
        const y = Math.sin(angle + angleVariation) * (radius + radiusVariation) + 
                  Math.sin(angle + angleVariation) * Math.cos(crossSectionAngle) * finalCrossSectionRadius;
        const z = Math.sin(crossSectionAngle) * finalCrossSectionRadius;
        
        return { x, y, z };
    }
    
    generateSpiralRipple(index, totalPoints) {
        // Create spiral donut with proper torus cross-section
        const t = index / totalPoints;
        const angle = t * Math.PI * 8; // Multiple rotations
        const radius = 10 + t * 6; // Spiral from radius 10 to 16
        
        // Add spiral arm structure
        const armOffset = Math.sin(angle * 2) * 1.0;
        const densityVariation = Math.exp(-t * 0.8);
        
        // Create donut cross-section with spiral variation
        const crossSectionAngle = Math.random() * Math.PI * 2;
        const crossSectionRadius = 4; // Slightly larger cross-section
        const spiralVariation = this.shape * 3; // Shape controls spiral-specific variation
        
        // Add spiral-based cross-section variation
        const spiralCrossSectionVariation = Math.sin(angle * 3) * Math.cos(t * Math.PI * 2) * spiralVariation;
        const finalCrossSectionRadius = crossSectionRadius + spiralCrossSectionVariation;
        
        // Position points in spiral donut cross-section
        const x = Math.cos(angle) * (radius + armOffset) * densityVariation + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * finalCrossSectionRadius;
        const y = Math.sin(angle) * (radius + armOffset) * densityVariation + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * finalCrossSectionRadius;
        const z = Math.sin(crossSectionAngle) * finalCrossSectionRadius;
        
        return { x, y, z };
    }
    
    generateWaveRipple(index, totalPoints) {
        // Create wave donut with dynamic torus cross-section
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 11 + t * 5; // Rings from radius 11 to 16
        
        // Create dynamic donut cross-section
        const crossSectionAngle = Math.random() * Math.PI * 2;
        const baseCrossSectionRadius = 3.5;
        
        // Wave amplitude affects cross-section radius
        const waveAmplitude = Math.sin(t * Math.PI * 4) * (1 - t) * 2;
        const shapeMultiplier = 1 + this.shape * 2;
        const finalCrossSectionRadius = (baseCrossSectionRadius + Math.abs(waveAmplitude)) * shapeMultiplier;
        
        // Add some cross-section variation for organic feel
        const crossSectionVariation = Math.sin(crossSectionAngle * 3) * this.shape * 1.5;
        const finalRadius = finalCrossSectionRadius + crossSectionVariation;
        
        const radiusVariation = (Math.random() - 0.5) * 0.6;
        
        // Position points in wave donut cross-section
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * finalRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * finalRadius;
        const z = Math.sin(crossSectionAngle) * finalRadius;
        
        return { x, y, z };
    }
    
    generateDoubleRingRipple(index, totalPoints) {
        // Create double ring donut with inner and outer rings
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        
        // Create two distinct ring radii
        let radius;
        if (t < 0.5) {
            // Inner ring
            radius = 8 + t * 4; // Radius 8 to 10
        } else {
            // Outer ring
            radius = 14 + (t - 0.5) * 4; // Radius 14 to 16
        }
        
        const radiusVariation = (Math.random() - 0.5) * 1.0;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        const crossSectionRadius = 2.5;
        
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateCrossedRingsRipple(index, totalPoints) {
        // Create crossed rings that intersect
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 10 + (Math.random() - 0.5) * 2;
        
        // Add crossing pattern
        const crossOffset = Math.sin(angle * 2) * 3;
        const radiusVariation = (Math.random() - 0.5) * 1.5;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        const crossSectionRadius = 3;
        
        const x = Math.cos(angle) * (radius + radiusVariation + crossOffset) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation + crossOffset) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateSpiralClusterRipple(index, totalPoints) {
        // Create multiple spiral clusters
        const t = index / totalPoints;
        const angle = t * Math.PI * 6;
        const radius = 6 + t * 12;
        
        // Create cluster variations
        const clusterOffset = Math.sin(angle * 3) * 2;
        const densityVariation = Math.exp(-t * 1.5);
        const crossSectionAngle = Math.random() * Math.PI * 2;
        const crossSectionRadius = 3.5;
        
        const x = Math.cos(angle) * (radius + clusterOffset) * densityVariation + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + clusterOffset) * densityVariation + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateWaveClusterRipple(index, totalPoints) {
        // Create wave-like clusters with amplitude variations
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 9 + t * 6;
        
        // Wave amplitude affects clustering
        const waveAmplitude = Math.sin(t * Math.PI * 3) * (1 - t) * 2;
        const clusterVariation = Math.sin(angle * 4) * 1.5;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        const crossSectionRadius = 2.8;
        
        const x = Math.cos(angle) * (radius + waveAmplitude + clusterVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + waveAmplitude + clusterVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateOrganicRingsRipple(index, totalPoints) {
        // Create organic, irregular ring patterns
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 11 + t * 5;
        
        // Add organic distortion
        const organicDistortion = Math.sin(angle * 5) * Math.cos(t * Math.PI * 2) * 2;
        const radiusVariation = (Math.random() - 0.5) * 1.2;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        const crossSectionRadius = 3.2;
        
        const x = Math.cos(angle) * (radius + organicDistortion + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + organicDistortion + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateGeometricRingsRipple(index, totalPoints) {
        // Create geometric, angular ring patterns
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 10 + t * 6;
        
        // Add geometric facets
        const geometricFacets = Math.floor(angle * 8) * 0.3;
        const radiusVariation = (Math.random() - 0.5) * 0.8;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        const crossSectionRadius = 2.5;
        
        const x = Math.cos(angle) * (radius + geometricFacets + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + geometricFacets + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateNebulaRingsRipple(index, totalPoints) {
        // Create nebula-like ring patterns with cosmic variations
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 12 + t * 4;
        
        // Add nebula-like variations
        const nebulaVariation = Math.sin(angle * 6) * Math.cos(t * Math.PI * 4) * 2;
        const radiusVariation = (Math.random() - 0.5) * 1.0;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        const crossSectionRadius = 3.8;
        
        const x = Math.cos(angle) * (radius + nebulaVariation + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + nebulaVariation + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateVariableWidthRipple(index, totalPoints) {
        // Create donut with variable width that changes around the circumference
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 10 + t * 6;
        
        // Variable cross-section radius based on angle
        const baseCrossSectionRadius = 2.5;
        const widthVariation = Math.sin(angle * 4) * 2 + Math.cos(angle * 3) * 1.5;
        const finalCrossSectionRadius = baseCrossSectionRadius + widthVariation;
        
        const radiusVariation = (Math.random() - 0.5) * 1.0;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * finalCrossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * finalCrossSectionRadius;
        const z = Math.sin(crossSectionAngle) * finalCrossSectionRadius;
        
        return { x, y, z };
    }
    
    generateTaperedRingsRipple(index, totalPoints) {
        // Create donut that tapers from thick to thin
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 9 + t * 7;
        
        // Taper the cross-section radius based on position
        const baseCrossSectionRadius = 4;
        const taperFactor = Math.sin(t * Math.PI) * 2; // Tapers from thick to thin
        const finalCrossSectionRadius = baseCrossSectionRadius - taperFactor;
        
        const radiusVariation = (Math.random() - 0.5) * 1.2;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * finalCrossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * finalCrossSectionRadius;
        const z = Math.sin(crossSectionAngle) * finalCrossSectionRadius;
        
        return { x, y, z };
    }
    
    generateBulgingRingsRipple(index, totalPoints) {
        // Create donut with bulging sections
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 11 + t * 4;
        
        // Add bulging effect at specific angles
        const bulgeAngle = Math.sin(angle * 3) * Math.cos(angle * 2);
        const bulgeIntensity = this.shape * 3;
        const crossSectionRadius = 3 + Math.abs(bulgeAngle) * bulgeIntensity;
        
        const radiusVariation = (Math.random() - 0.5) * 1.0;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateConstrictedRingsRipple(index, totalPoints) {
        // Create donut with constricted (pinched) sections
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 10 + t * 5;
        
        // Add constriction effect at specific angles
        const constrictionAngle = Math.sin(angle * 4) * Math.cos(angle * 3);
        const constrictionIntensity = this.shape * 2;
        const crossSectionRadius = 3.5 - Math.abs(constrictionAngle) * constrictionIntensity;
        
        const radiusVariation = (Math.random() - 0.5) * 1.0;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateWavyWidthRipple(index, totalPoints) {
        // Create donut with wavy, undulating width
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 12 + t * 3;
        
        // Create wavy width pattern
        const wave1 = Math.sin(angle * 5) * 1.5;
        const wave2 = Math.cos(angle * 3) * 1.0;
        const wave3 = Math.sin(angle * 7) * 0.8;
        const crossSectionRadius = 3 + wave1 + wave2 + wave3;
        
        const radiusVariation = (Math.random() - 0.5) * 0.8;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateSpiralWidthRipple(index, totalPoints) {
        // Create donut with spiral-based width variations
        const t = index / totalPoints;
        const angle = t * Math.PI * 6;
        const radius = 8 + t * 10;
        
        // Spiral-based width changes
        const spiralWidth = Math.sin(angle * 2) * Math.cos(t * Math.PI * 3) * 2;
        const crossSectionRadius = 3.5 + spiralWidth;
        
        const armOffset = Math.sin(angle * 2) * 1.5;
        const densityVariation = Math.exp(-t * 1.2);
        const crossSectionAngle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * (radius + armOffset) * densityVariation + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + armOffset) * densityVariation + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateOrganicWidthRipple(index, totalPoints) {
        // Create donut with organic, natural width variations
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 11 + t * 4;
        
        // Organic width variations
        const organic1 = Math.sin(angle * 3) * Math.cos(t * Math.PI * 2) * 2;
        const organic2 = Math.sin(angle * 5) * Math.cos(t * Math.PI * 3) * 1.5;
        const organic3 = Math.sin(angle * 2) * Math.cos(t * Math.PI * 4) * 1.0;
        const crossSectionRadius = 3.2 + organic1 + organic2 + organic3;
        
        const radiusVariation = (Math.random() - 0.5) * 1.0;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateGeometricWidthRipple(index, totalPoints) {
        // Create donut with geometric, angular width patterns
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 10 + t * 5;
        
        // Geometric width patterns
        const geometric1 = Math.floor(angle * 6) * 0.4;
        const geometric2 = Math.floor(angle * 4) * 0.3;
        const geometric3 = Math.floor(angle * 8) * 0.2;
        const crossSectionRadius = 2.8 + geometric1 + geometric2 + geometric3;
        
        const radiusVariation = (Math.random() - 0.5) * 0.8;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateNebulaWidthRipple(index, totalPoints) {
        // Create donut with nebula-like width variations
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 13 + t * 3;
        
        // Nebula-like width patterns
        const nebula1 = Math.sin(angle * 6) * Math.cos(t * Math.PI * 4) * 2;
        const nebula2 = Math.sin(angle * 8) * Math.cos(t * Math.PI * 2) * 1.5;
        const nebula3 = Math.sin(angle * 4) * Math.cos(t * Math.PI * 6) * 1.0;
        const crossSectionRadius = 3.5 + nebula1 + nebula2 + nebula3;
        
        const radiusVariation = (Math.random() - 0.5) * 0.8;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateCosmicWidthRipple(index, totalPoints) {
        // Create donut with cosmic, space-like width variations
        const t = index / totalPoints;
        const angle = Math.random() * Math.PI * 2;
        const radius = 12 + t * 4;
        
        // Cosmic width patterns
        const cosmic1 = Math.sin(angle * 7) * Math.cos(t * Math.PI * 5) * 2.5;
        const cosmic2 = Math.sin(angle * 9) * Math.cos(t * Math.PI * 3) * 2.0;
        const cosmic3 = Math.sin(angle * 5) * Math.cos(t * Math.PI * 7) * 1.5;
        const cosmic4 = Math.sin(angle * 11) * Math.cos(t * Math.PI * 1) * 1.0;
        const crossSectionRadius = 3.8 + cosmic1 + cosmic2 + cosmic3 + cosmic4;
        
        const radiusVariation = (Math.random() - 0.5) * 0.6;
        const crossSectionAngle = Math.random() * Math.PI * 2;
        
        const x = Math.cos(angle) * (radius + radiusVariation) + 
                  Math.cos(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const y = Math.sin(angle) * (radius + radiusVariation) + 
                  Math.sin(angle) * Math.cos(crossSectionAngle) * crossSectionRadius;
        const z = Math.sin(crossSectionAngle) * crossSectionRadius;
        
        return { x, y, z };
    }
    
    generateDistortedSpherePoint(index, totalPoints) {
        // Generate points on a sphere with distortion
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        
        let radius = 10;
        
        // Add distortion based on position and shape parameter
        const distortionIntensity = this.shape * 4; // Shape controls distortion strength
        const distortion = Math.sin(phi * (3 + this.shape * 2)) * Math.cos(theta * (2 + this.shape * 3)) * distortionIntensity;
        radius += distortion;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return { x, y, z };
    }
    
    generateOrganicBlob(index, totalPoints) {
        // Create organic, amoeba-like blob
        const t = index / totalPoints;
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        
        let radius = 8;
        
        // Add organic distortion with shape parameter
        const organicDistortion = Math.sin(phi * 2) * Math.cos(theta * 3) * this.shape * 4;
        const blobVariation = Math.sin(phi * 5) * Math.cos(theta * 2) * this.shape * 3;
        radius += organicDistortion + blobVariation;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return { x, y, z };
    }
    
    generateCrystallineBlob(index, totalPoints) {
        // Create crystalline, geometric blob
        const t = index / totalPoints;
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        
        let radius = 10;
        
        // Add crystalline facets
        const crystalFacets = Math.floor(phi * 8) * Math.floor(theta * 6) * 0.5;
        const shapeVariation = this.shape * 3;
        radius += crystalFacets * shapeVariation;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return { x, y, z };
    }
    
    generateAmoebaBlob(index, totalPoints) {
        // Create amoeba-like blob with pseudopods
        const t = index / totalPoints;
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        
        let radius = 9;
        
        // Create pseudopod-like extensions
        const pseudopod1 = Math.sin(phi * 3) * Math.cos(theta * 2) * this.shape * 5;
        const pseudopod2 = Math.sin(phi * 2) * Math.cos(theta * 4) * this.shape * 4;
        radius += pseudopod1 + pseudopod2;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return { x, y, z };
    }
    
    generateFractalBlob(index, totalPoints) {
        // Create fractal-like blob with self-similar patterns
        const t = index / totalPoints;
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        
        let radius = 8;
        
        // Add fractal-like variations
        const fractal1 = Math.sin(phi * 7) * Math.cos(theta * 5) * this.shape * 3;
        const fractal2 = Math.sin(phi * 11) * Math.cos(theta * 7) * this.shape * 2;
        const fractal3 = Math.sin(phi * 13) * Math.cos(theta * 11) * this.shape * 1.5;
        radius += fractal1 + fractal2 + fractal3;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return { x, y, z };
    }
    
    generateBubbleBlob(index, totalPoints) {
        // Create bubble-like blob with spherical clusters
        const t = index / totalPoints;
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        
        let radius = 7;
        
        // Create bubble clusters
        const bubbleCluster = Math.sin(phi * 4) * Math.cos(theta * 3) * this.shape * 4;
        const bubbleVariation = Math.sin(phi * 6) * Math.cos(theta * 2) * this.shape * 2;
        radius += bubbleCluster + bubbleVariation;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return { x, y, z };
    }
    
    generateTentacleBlob(index, totalPoints) {
        // Create tentacle-like blob with extending appendages
        const t = index / totalPoints;
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        
        let radius = 8;
        
        // Create tentacle-like extensions
        const tentacle1 = Math.sin(phi * 2) * Math.cos(theta * 3) * this.shape * 6;
        const tentacle2 = Math.sin(phi * 4) * Math.cos(theta * 1) * this.shape * 4;
        const tentacle3 = Math.sin(phi * 1) * Math.cos(theta * 5) * this.shape * 3;
        radius += tentacle1 + tentacle2 + tentacle3;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return { x, y, z };
    }
    
    generateCellularBlob(index, totalPoints) {
        // Create cellular blob with cell-like structures
        const t = index / totalPoints;
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        
        let radius = 9;
        
        // Create cellular patterns
        const cell1 = Math.sin(phi * 3) * Math.cos(theta * 2) * this.shape * 4;
        const cell2 = Math.sin(phi * 5) * Math.cos(theta * 3) * this.shape * 3;
        const cell3 = Math.sin(phi * 2) * Math.cos(theta * 4) * this.shape * 2.5;
        radius += cell1 + cell2 + cell3;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return { x, y, z };
    }
    
    generateVortexBlob(index, totalPoints) {
        // Create vortex-like blob with swirling patterns
        const t = index / totalPoints;
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        
        let radius = 8;
        
        // Create vortex swirls
        const vortex1 = Math.sin(phi * 3 + theta * 2) * this.shape * 5;
        const vortex2 = Math.cos(phi * 2 + theta * 3) * this.shape * 4;
        const vortex3 = Math.sin(phi * 4 + theta * 1) * this.shape * 3;
        radius += vortex1 + vortex2 + vortex3;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return { x, y, z };
    }
    
    generateNebulaBlob(index, totalPoints) {
        // Create nebula-like blob with cosmic patterns
        const t = index / totalPoints;
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.random() * Math.PI * 2;
        
        let radius = 10;
        
        // Create nebula-like variations
        const nebula1 = Math.sin(phi * 6) * Math.cos(theta * 4) * this.shape * 4;
        const nebula2 = Math.sin(phi * 8) * Math.cos(theta * 2) * this.shape * 3;
        const nebula3 = Math.sin(phi * 4) * Math.cos(theta * 6) * this.shape * 2;
        radius += nebula1 + nebula2 + nebula3;
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        return { x, y, z };
    }
    
    setupControls() {
        // Point radius slider
        const pointRadiusSlider = document.getElementById('pointRadius');
        
        // Set initial fill
        pointRadiusSlider.style.setProperty('--value-percent', '50%');
        
        pointRadiusSlider.addEventListener('input', (e) => {
            this.pointRadius = parseFloat(e.target.value);
            
            // Update slider fill
            const percent = ((this.pointRadius - 0.01) / (0.1 - 0.01)) * 100;
            pointRadiusSlider.style.setProperty('--value-percent', percent + '%');
            
            // Update existing points without regenerating
            if (this.points && this.points.children.length > 0) {
                this.points.children.forEach(child => {
                    if (child.geometry) {
                        child.geometry.dispose();
                        child.geometry = new THREE.SphereGeometry(this.pointRadius, 8, 6);
                    }
                });
            }
        });
        
        // Number of points slider
        const numPointsSlider = document.getElementById('numPoints');
        
        // Set initial fill
        numPointsSlider.style.setProperty('--value-percent', '50%');
        
        numPointsSlider.addEventListener('input', (e) => {
            this.numPoints = parseInt(e.target.value);
            
            // Update slider fill
            const percent = ((this.numPoints - 100) / (10000 - 100)) * 100;
            numPointsSlider.style.setProperty('--value-percent', percent + '%');
            
            // Regenerate current shape with new number of points
            if (this.currentMode === 'sphere') {
                this.generateCurrentBlobShape();
            } else if (this.currentMode === 'ripples') {
                this.generateRipplePoints(false);
            } else if (this.currentMode === 'waves') {
                this.generateCurrentWaveShape();
            }
        });
        
        // Shape slider
        const shapeSlider = document.getElementById('shape');
        
        // Set initial fill
        shapeSlider.style.setProperty('--value-percent', '50%');
        
        shapeSlider.addEventListener('input', (e) => {
            this.shape = parseFloat(e.target.value);
            
            // Update slider fill
            const percent = this.shape * 100;
            shapeSlider.style.setProperty('--value-percent', percent + '%');
            
            // Update shape based on current mode
            if (this.currentMode === 'ripples') {
                // Map shape (0-1) to ripple index (0-19)
                this.rippleIndex = Math.floor(this.shape * 19);
                this.generateRipplePoints(false);
            } else if (this.currentMode === 'waves') {
                // Map shape (0-1) to wave index (0-19)
                this.waveIndex = Math.floor(this.shape * 19);
                this.generateWaves();
            } else {
                // For blob mode, regenerate current shape
                this.regenerateCurrentMode();
            }
        });
        
        // Radio button event listeners for shape type selection
        const radioButtons = document.querySelectorAll('input[name="shapeType"]');
        
        radioButtons.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const selectedValue = e.target.value;
                
                if (selectedValue === 'blobs') {
                    this.generatePoints();
                } else if (selectedValue === 'ripples') {
                    this.generateRipplePoints(true);
                } else if (selectedValue === 'waves') {
                    this.generateWaves();
                }
            });
        });
    }
    
    onMouseDown(event) {
        this.isMouseDown = true;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }
    
    onMouseMove(event) {
        if (!this.isMouseDown) return;
        
        const deltaX = event.clientX - this.mouseX;
        const deltaY = event.clientY - this.mouseY;
        
        this.cameraRotationY += deltaX * 0.01;
        this.cameraRotationX += deltaY * 0.01;
        
        // Limit vertical rotation
        this.cameraRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.cameraRotationX));
        
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        
        this.updateCameraPosition();
    }
    
    onMouseUp() {
        this.isMouseDown = false;
    }
    
    onWheel(event) {
        event.preventDefault();
        
        const zoomSpeed = 0.1;
        this.cameraDistance += event.deltaY * zoomSpeed;
        
        // Limit zoom
        this.cameraDistance = Math.max(5, Math.min(200, this.cameraDistance));
        
        this.updateCameraPosition();
    }
    
    updateCameraPosition() {
        const x = this.cameraDistance * Math.sin(this.cameraRotationY) * Math.cos(this.cameraRotationX);
        const y = this.cameraDistance * Math.sin(this.cameraRotationX);
        const z = this.cameraDistance * Math.cos(this.cameraRotationY) * Math.cos(this.cameraRotationX);
        
        this.camera.position.set(x, y, z);
        this.camera.lookAt(0, 0, 0);
    }
    
    onWindowResize() {
        this.camera.aspect = (window.innerWidth - 250) / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth - 250, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PointVisualizer();
});
