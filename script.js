class PointVisualizer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.points = null;
        this.controls = null;
        
        this.pointDensity = 1.0;
        this.pointRadius = 0.1;
        this.numPoints = 1000;
        
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
        // Remove existing points
        if (this.points) {
            this.scene.remove(this.points);
        }
        
        // Create a group to hold all the spheres
        this.points = new THREE.Group();
        
        const clusterSize = 20 * this.pointDensity;
        const numClusters = Math.max(1, Math.floor(this.numPoints / 1000));
        
        // Create sphere geometry and material once for efficiency
        const sphereGeometry = new THREE.SphereGeometry(this.pointRadius, 8, 6);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        
        for (let i = 0; i < this.numPoints; i++) {
            let x, y, z;
            
            if (numClusters > 1) {
                // Create multiple clusters
                const clusterIndex = Math.floor(i / (this.numPoints / numClusters));
                const clusterOffsetX = (clusterIndex % 3 - 1) * clusterSize * 0.8;
                const clusterOffsetY = (Math.floor(clusterIndex / 3) - 1) * clusterSize * 0.8;
                
                x = (Math.random() - 0.5) * clusterSize + clusterOffsetX;
                y = (Math.random() - 0.5) * clusterSize + clusterOffsetY;
                z = (Math.random() - 0.5) * clusterSize;
            } else {
                // Single cluster
                x = (Math.random() - 0.5) * clusterSize;
                y = (Math.random() - 0.5) * clusterSize;
                z = (Math.random() - 0.5) * clusterSize;
            }
            
            // Create individual sphere mesh
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.position.set(x, y, z);
            this.points.add(sphere);
        }
        
        this.scene.add(this.points);
    }
    
    setupControls() {
        const densitySlider = document.getElementById('pointDensity');
        const radiusSlider = document.getElementById('pointRadius');
        const pointsSlider = document.getElementById('numPoints');
        
        const densityValue = document.getElementById('densityValue');
        const radiusValue = document.getElementById('radiusValue');
        const pointsValue = document.getElementById('pointsValue');
        
        densitySlider.addEventListener('input', (e) => {
            this.pointDensity = parseFloat(e.target.value);
            densityValue.textContent = this.pointDensity.toFixed(1);
            this.generatePoints();
        });
        
        radiusSlider.addEventListener('input', (e) => {
            this.pointRadius = parseFloat(e.target.value);
            radiusValue.textContent = this.pointRadius.toFixed(1);
            // Regenerate points with new radius since we're using individual spheres
            this.generatePoints();
        });
        
        pointsSlider.addEventListener('input', (e) => {
            this.numPoints = parseInt(e.target.value);
            pointsValue.textContent = this.numPoints;
            this.generatePoints();
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
        
        // Optional: Add some rotation to the points
        if (this.points) {
            this.points.rotation.y += 0.001;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PointVisualizer();
});
