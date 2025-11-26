/**
 * Hand Tracking Shadow Puppets
 * Main application logic
 */

class ShadowPuppetApp {
    constructor() {
        // Canvas setup
        this.canvas = document.getElementById('puppetCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();

        // Video setup
        this.video = document.getElementById('webcam');

        // Managers
        this.puppetManager = new PuppetManager();
        this.gestureRecognizer = new GestureRecognizer();

        // UI elements
        this.loadingEl = document.getElementById('loading');
        this.gestureIndicator = document.getElementById('gestureIndicator');
        this.leftHandState = document.getElementById('leftHandState');
        this.rightHandState = document.getElementById('rightHandState');

        // Hand tracking state
        this.hands = new Map(); // handedness -> landmarks
        this.lastHandUpdate = new Map();

        // Animation
        this.isRunning = false;

        // Initialize
        this.init();
    }

    async init() {
        try {
            // Setup event listeners
            this.setupEventListeners();

            // Initialize MediaPipe Hands
            await this.initializeHandTracking();

            // Start animation loop
            this.isRunning = true;
            this.animate();

            // Hide loading screen
            setTimeout(() => {
                this.loadingEl.classList.add('hidden');
            }, 500);

        } catch (error) {
            console.error('Initialization error:', error);
            this.showError('Failed to initialize hand tracking. Please check camera permissions.');
        }
    }

    async initializeHandTracking() {
        // Initialize MediaPipe Hands
        this.handsDetector = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });

        this.handsDetector.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7
        });

        this.handsDetector.onResults((results) => this.onHandsDetected(results));

        // Setup camera
        const camera = new Camera(this.video, {
            onFrame: async () => {
                await this.handsDetector.send({ image: this.video });
            },
            width: 1280,
            height: 720
        });

        await camera.start();
    }

    onHandsDetected(results) {
        const currentTime = Date.now();
        const detectedHands = new Set();

        if (results.multiHandLandmarks && results.multiHandedness) {
            for (let i = 0; i < results.multiHandLandmarks.length; i++) {
                const landmarks = results.multiHandLandmarks[i];
                const handedness = results.multiHandedness[i].label; // 'Left' or 'Right'

                detectedHands.add(handedness);
                this.hands.set(handedness, landmarks);
                this.lastHandUpdate.set(handedness, currentTime);

                // Recognize gesture
                const gesture = this.gestureRecognizer.recognizeGesture(landmarks, handedness);

                // Update UI
                this.updateHandStatus(handedness, gesture);
            }
        }

        // Check for two-hand gestures
        const leftLandmarks = this.hands.get('Left');
        const rightLandmarks = this.hands.get('Right');
        const twoHandGesture = this.gestureRecognizer.detectTwoHandGesture(
            leftLandmarks,
            rightLandmarks
        );

        if (twoHandGesture) {
            // Create combined puppet
            this.createCombinedPuppet(twoHandGesture);
            this.updateGestureIndicator(`🦋 ${twoHandGesture.type.toUpperCase()} (Two Hands)`);
        } else {
            // Remove combined puppet if it exists
            this.puppetManager.removeCombinedPuppet();

            // Update individual puppets
            this.hands.forEach((landmarks, handedness) => {
                const gesture = this.gestureRecognizer.getGesture(handedness);
                if (gesture) {
                    this.updatePuppet(handedness, gesture);
                }
            });

            // Update gesture indicator
            this.updateGestureIndicatorFromHands();
        }

        // Clean up hands that haven't been updated
        const timeout = 500; // ms
        this.hands.forEach((_, handedness) => {
            if (!detectedHands.has(handedness)) {
                const lastUpdate = this.lastHandUpdate.get(handedness) || 0;
                if (currentTime - lastUpdate > timeout) {
                    this.removeHand(handedness);
                }
            }
        });
    }

    updatePuppet(handedness, gesture) {
        // Convert normalized coordinates to canvas coordinates
        const x = gesture.position.x * this.canvas.width;
        const y = gesture.position.y * this.canvas.height;

        // Base scale multiplied by gesture scale
        const baseScale = Math.min(this.canvas.width, this.canvas.height) / 800;
        const scale = baseScale * gesture.scale;

        this.puppetManager.updatePuppet(
            handedness,
            gesture.type,
            x,
            y,
            scale,
            gesture.rotation
        );
    }

    createCombinedPuppet(twoHandGesture) {
        const x = twoHandGesture.position.x * this.canvas.width;
        const y = twoHandGesture.position.y * this.canvas.height;
        const baseScale = Math.min(this.canvas.width, this.canvas.height) / 600;
        const scale = baseScale * twoHandGesture.scale * 1.5; // Larger for combined puppets

        this.puppetManager.createCombinedPuppet(
            twoHandGesture.type,
            x,
            y,
            scale
        );
    }

    removeHand(handedness) {
        this.hands.delete(handedness);
        this.lastHandUpdate.delete(handedness);
        this.gestureRecognizer.clearHand(handedness);
        this.puppetManager.removePuppet(handedness);
        this.updateHandStatus(handedness, null);
    }

    updateHandStatus(handedness, gesture) {
        const stateEl = handedness === 'Left' ? this.leftHandState : this.rightHandState;
        if (gesture) {
            const emoji = gesture.type === 'bird' ? '🐦' :
                         gesture.type === 'dog' ? '🐕' :
                         gesture.type === 'rabbit' ? '🐰' : '❓';
            stateEl.textContent = `${emoji} ${gesture.type}`;
        } else {
            stateEl.textContent = '-';
        }
    }

    updateGestureIndicator(text) {
        const gestureText = this.gestureIndicator.querySelector('.gesture-text');
        gestureText.textContent = text;
    }

    updateGestureIndicatorFromHands() {
        if (this.hands.size === 0) {
            this.updateGestureIndicator('Waiting for hands...');
        } else if (this.hands.size === 1) {
            const handedness = Array.from(this.hands.keys())[0];
            const gesture = this.gestureRecognizer.getGesture(handedness);
            if (gesture) {
                const desc = this.gestureRecognizer.getGestureDescription(handedness);
                this.updateGestureIndicator(desc);
            }
        } else {
            this.updateGestureIndicator('Two hands detected - try combining!');
        }
    }

    animate() {
        if (!this.isRunning) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw animated background with lighting effects
        this.drawBackground();

        // Draw hand outlines
        this.drawHandOutlines();

        // Update and draw puppets
        this.puppetManager.update();
        this.puppetManager.draw(this.ctx);

        requestAnimationFrame(() => this.animate());
    }

    drawBackground() {
        // Dark background (black)
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw glowing light source (like a moon or spotlight)
        const lightX = this.canvas.width / 2;
        const lightY = this.canvas.height / 2;
        const lightRadius = Math.min(this.canvas.width, this.canvas.height) * 0.35;

        // Create radial gradient for the glow effect
        const gradient = this.ctx.createRadialGradient(
            lightX, lightY, lightRadius * 0.7,
            lightX, lightY, lightRadius * 1.3
        );

        // Warm, soft glow (like the image)
        gradient.addColorStop(0, 'rgba(255, 248, 230, 0.95)'); // Warm white center
        gradient.addColorStop(0.4, 'rgba(255, 240, 200, 0.6)'); // Soft yellow-white
        gradient.addColorStop(0.7, 'rgba(255, 220, 150, 0.3)'); // Fading warm glow
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Fade to black

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawHandOutlines() {
        // Very subtle hand outlines - barely visible to maintain shadow aesthetic
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        this.hands.forEach((landmarks) => {
            // Draw hand skeleton - very faint
            const connections = [
                [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
                [0, 5], [5, 6], [6, 7], [7, 8], // Index
                [0, 9], [9, 10], [10, 11], [11, 12], // Middle
                [0, 13], [13, 14], [14, 15], [15, 16], // Ring
                [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
                [5, 9], [9, 13], [13, 17] // Palm
            ];

            connections.forEach(([start, end]) => {
                const startPoint = landmarks[start];
                const endPoint = landmarks[end];

                this.ctx.beginPath();
                this.ctx.moveTo(
                    startPoint.x * this.canvas.width,
                    startPoint.y * this.canvas.height
                );
                this.ctx.lineTo(
                    endPoint.x * this.canvas.width,
                    endPoint.y * this.canvas.height
                );
                this.ctx.stroke();
            });

            // Draw landmark points - very subtle
            landmarks.forEach((landmark) => {
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                this.ctx.beginPath();
                this.ctx.arc(
                    landmark.x * this.canvas.width,
                    landmark.y * this.canvas.height,
                    2,
                    0,
                    Math.PI * 2
                );
                this.ctx.fill();
            });
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());

        const toggleBtn = document.getElementById('toggleInstructions');
        const instructions = document.querySelector('.instructions');

        toggleBtn.addEventListener('click', () => {
            instructions.classList.toggle('hidden');
            toggleBtn.textContent = instructions.classList.contains('hidden') ? 'Show' : 'Hide';
        });
    }

    showError(message) {
        this.loadingEl.querySelector('p').textContent = message;
        this.loadingEl.querySelector('.spinner').style.display = 'none';
    }
}

// Initialize app when page loads
window.addEventListener('DOMContentLoaded', () => {
    new ShadowPuppetApp();
});
