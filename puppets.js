/**
 * Shadow Puppet Renderer
 * Pure silhouette shadows that look realistic, not clipart
 */

class Puppet {
    constructor(type, x, y, scale = 1, rotation = 0) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.rotation = rotation;
        this.targetX = x;
        this.targetY = y;
        this.targetScale = scale;
        this.opacity = 0;
        this.targetOpacity = 1;
        this.handedness = null; // 'Left' or 'Right'
        this.gestureHoldTime = 0; // Track how long this type has been held
        this.lastUpdateTime = Date.now();
    }

    update() {
        // Smooth interpolation
        const smoothing = 0.15;
        this.x += (this.targetX - this.x) * smoothing;
        this.y += (this.targetY - this.y) * smoothing;
        this.scale += (this.targetScale - this.scale) * smoothing;
        this.opacity += (this.targetOpacity - this.opacity) * smoothing;

        // Track gesture hold time
        const now = Date.now();
        const deltaTime = (now - this.lastUpdateTime) / 1000; // Convert to seconds
        this.gestureHoldTime += deltaTime;
        this.lastUpdateTime = now;
    }

    resetHoldTime() {
        this.gestureHoldTime = 0;
        this.lastUpdateTime = Date.now();
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        ctx.globalAlpha = this.opacity;

        // Pure black shadow - no glow on the puppet itself
        ctx.fillStyle = '#000';
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // Draw the puppet shape
        switch (this.type) {
            case 'dog':
                this.drawDog(ctx);
                break;
            case 'bird':
                this.drawBird(ctx);
                break;
            case 'rabbit':
                this.drawRabbit(ctx);
                break;
            case 'butterfly':
                this.drawButterfly(ctx);
                break;
            case 'elephant':
                this.drawElephant(ctx);
                break;
        }

        ctx.restore();
    }

    drawDog(ctx) {
        // Simplified dog silhouette (like a fist with thumb up)
        ctx.beginPath();

        // Main body (fist)
        ctx.ellipse(0, 0, 70, 90, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout projection
        ctx.beginPath();
        ctx.moveTo(40, -20);
        ctx.quadraticCurveTo(80, 0, 80, 30);
        ctx.quadraticCurveTo(70, 50, 50, 40);
        ctx.lineTo(40, 20);
        ctx.closePath();
        ctx.fill();

        // Ears
        ctx.beginPath();
        ctx.ellipse(-60, -60, 30, 60, -0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(20, -80, 35, 50, 0.3, 0, Math.PI * 2);
        ctx.fill();
    }

    drawBird(ctx) {
        // Bird silhouette (open hand)
        ctx.beginPath();

        // Body
        ctx.ellipse(0, 20, 50, 60, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Head and neck
        ctx.beginPath();
        ctx.ellipse(-10, -30, 40, 40, 0, 0, Math.PI * 2);
        ctx.fill();

        // Beak
        ctx.beginPath();
        ctx.moveTo(20, -30);
        ctx.lineTo(60, -25);
        ctx.lineTo(20, -20);
        ctx.closePath();
        ctx.fill();

        // Left wing (spread)
        ctx.beginPath();
        ctx.moveTo(-30, 10);
        ctx.quadraticCurveTo(-80, -20, -100, -10);
        ctx.quadraticCurveTo(-110, 0, -100, 20);
        ctx.quadraticCurveTo(-80, 40, -50, 50);
        ctx.lineTo(-30, 30);
        ctx.closePath();
        ctx.fill();

        // Right wing (spread)
        ctx.beginPath();
        ctx.moveTo(30, 10);
        ctx.quadraticCurveTo(70, -30, 90, -30);
        ctx.quadraticCurveTo(100, -20, 100, 0);
        ctx.quadraticCurveTo(90, 30, 60, 50);
        ctx.lineTo(30, 40);
        ctx.closePath();
        ctx.fill();

        // Tail
        ctx.beginPath();
        ctx.moveTo(-20, 60);
        ctx.lineTo(-10, 100);
        ctx.lineTo(10, 100);
        ctx.lineTo(20, 60);
        ctx.closePath();
        ctx.fill();
    }

    drawRabbit(ctx) {
        // Rabbit silhouette (pinch gesture)
        ctx.beginPath();

        // Head
        ctx.ellipse(0, 10, 60, 70, 0, 0, Math.PI * 2);
        ctx.fill();

        // Long ear 1
        ctx.beginPath();
        ctx.ellipse(-25, -80, 20, 70, -0.1, 0, Math.PI * 2);
        ctx.fill();

        // Long ear 2
        ctx.beginPath();
        ctx.ellipse(25, -80, 20, 70, 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Cheek puffs
        ctx.beginPath();
        ctx.ellipse(-45, 20, 25, 30, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(45, 20, 25, 30, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    drawButterfly(ctx) {
        // Butterfly silhouette (two hands together)
        ctx.beginPath();

        // Body
        ctx.ellipse(0, 0, 12, 70, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.arc(0, -75, 15, 0, Math.PI * 2);
        ctx.fill();

        // Upper left wing
        ctx.beginPath();
        ctx.moveTo(-10, -40);
        ctx.bezierCurveTo(-40, -70, -80, -80, -90, -50);
        ctx.bezierCurveTo(-95, -30, -85, -10, -60, -5);
        ctx.bezierCurveTo(-40, -10, -20, -20, -10, -30);
        ctx.closePath();
        ctx.fill();

        // Upper right wing
        ctx.beginPath();
        ctx.moveTo(10, -40);
        ctx.bezierCurveTo(40, -70, 80, -80, 90, -50);
        ctx.bezierCurveTo(95, -30, 85, -10, 60, -5);
        ctx.bezierCurveTo(40, -10, 20, -20, 10, -30);
        ctx.closePath();
        ctx.fill();

        // Lower left wing
        ctx.beginPath();
        ctx.moveTo(-10, 20);
        ctx.bezierCurveTo(-35, 30, -60, 45, -70, 60);
        ctx.bezierCurveTo(-70, 70, -60, 75, -45, 70);
        ctx.bezierCurveTo(-30, 60, -15, 40, -10, 30);
        ctx.closePath();
        ctx.fill();

        // Lower right wing
        ctx.beginPath();
        ctx.moveTo(10, 20);
        ctx.bezierCurveTo(35, 30, 60, 45, 70, 60);
        ctx.bezierCurveTo(70, 70, 60, 75, 45, 70);
        ctx.bezierCurveTo(30, 60, 15, 40, 10, 30);
        ctx.closePath();
        ctx.fill();
    }

    drawElephant(ctx) {
        // Elephant silhouette (two fists together)
        ctx.beginPath();

        // Large head/body
        ctx.ellipse(0, -10, 100, 80, 0, 0, Math.PI * 2);
        ctx.fill();

        // Trunk (curved)
        ctx.beginPath();
        ctx.moveTo(60, 30);
        ctx.bezierCurveTo(80, 60, 75, 100, 60, 130);
        ctx.bezierCurveTo(50, 135, 40, 130, 45, 120);
        ctx.bezierCurveTo(55, 95, 55, 60, 50, 30);
        ctx.closePath();
        ctx.fill();

        // Large ear left
        ctx.beginPath();
        ctx.ellipse(-80, -10, 50, 70, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // Large ear right
        ctx.beginPath();
        ctx.ellipse(80, -10, 50, 70, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Tusks hint (subtle)
        ctx.beginPath();
        ctx.moveTo(35, 20);
        ctx.lineTo(50, 55);
        ctx.lineTo(45, 55);
        ctx.lineTo(30, 25);
        ctx.closePath();
        ctx.fill();
    }
}

/**
 * Animal Class
 * Represents the actual animal that appears after holding a gesture
 */
class Animal {
    constructor(type, handedness = null) {
        this.type = type;
        this.handedness = handedness;

        // Will be positioned in center on first draw
        this.x = 0;
        this.y = 0;
        this.initialized = false;

        this.baseScale = 1.2;
        this.scale = 0; // Start at 0 for spawn animation
        this.opacity = 0;
        this.rotation = 0;
        this.targetOpacity = 1;
        this.targetScale = this.baseScale;
        this.isAppearing = true;
        this.lifetime = 0;

        // Animation state
        this.animationPhase = 0;
        this.direction = Math.random() < 0.5 ? -1 : 1; // Random direction

        // Animal-specific movement
        this.setupAnimalMovement();
    }

    setupAnimalMovement() {
        switch (this.type) {
            case 'rabbit':
                this.hopHeight = 40;
                this.hopSpeed = 3;
                this.moveSpeed = 80;
                this.nextHop = 0;
                break;
            case 'bird':
                this.flapSpeed = 8;
                this.flySpeed = 60;
                this.waveAmplitude = 30;
                break;
            case 'dog':
                this.runSpeed = 50;
                this.bobAmount = 10;
                this.bobSpeed = 10;
                break;
            case 'butterfly':
                this.flutterSpeed = 6;
                this.driftSpeed = 40;
                this.waveAmplitude = 50;
                break;
            case 'elephant':
                this.walkSpeed = 30;
                this.trunkSwing = 0.15;
                break;
        }
    }

    update(deltaTime) {
        // Spawn animation - grow and fade in
        if (this.isAppearing) {
            this.scale += (this.targetScale - this.scale) * 0.1;
            this.opacity += (this.targetOpacity - this.opacity) * 0.08;

            if (Math.abs(this.scale - this.targetScale) < 0.01) {
                this.isAppearing = false;
            }
        } else {
            // Animal-specific animations
            this.animationPhase += deltaTime;

            switch (this.type) {
                case 'rabbit':
                    this.updateRabbitHop(deltaTime);
                    break;
                case 'bird':
                    this.updateBirdFly(deltaTime);
                    break;
                case 'dog':
                    this.updateDogRun(deltaTime);
                    break;
                case 'butterfly':
                    this.updateButterflyFlutter(deltaTime);
                    break;
                case 'elephant':
                    this.updateElephantWalk(deltaTime);
                    break;
            }
        }

        this.lifetime += deltaTime;
    }

    updateRabbitHop(deltaTime) {
        // Hop across the screen
        this.x += this.direction * this.moveSpeed * deltaTime;

        // Hopping animation
        if (this.animationPhase > this.nextHop) {
            this.nextHop = this.animationPhase + 0.5; // Hop every 0.5 seconds
        }

        const timeSinceLastHop = this.nextHop - this.animationPhase;
        if (timeSinceLastHop < 0.3) {
            // Arc motion
            const hopProgress = (0.3 - timeSinceLastHop) / 0.3;
            this.y -= Math.sin(hopProgress * Math.PI) * this.hopHeight;
        }

        this.rotation = this.direction > 0 ? 0 : Math.PI;
    }

    updateBirdFly(deltaTime) {
        // Fly across with wave motion
        this.x += this.direction * this.flySpeed * deltaTime;
        this.y += Math.sin(this.animationPhase * 2) * this.waveAmplitude * deltaTime;

        // Wing flap rotation
        this.rotation = Math.sin(this.animationPhase * this.flapSpeed) * 0.2;
    }

    updateDogRun(deltaTime) {
        // Run across the screen
        this.x += this.direction * this.runSpeed * deltaTime;

        // Bobbing while running
        this.y += Math.sin(this.animationPhase * this.bobSpeed) * this.bobAmount * deltaTime;

        this.rotation = this.direction > 0 ? 0 : Math.PI;
    }

    updateButterflyFlutter(deltaTime) {
        // Flutter in a wavy pattern
        this.x += this.direction * this.driftSpeed * deltaTime;
        this.y += Math.sin(this.animationPhase * 3) * this.waveAmplitude * deltaTime;

        // Gentle rotation as it flies
        this.rotation = Math.sin(this.animationPhase * this.flutterSpeed) * 0.15;
    }

    updateElephantWalk(deltaTime) {
        // Slow walk across screen
        this.x += this.direction * this.walkSpeed * deltaTime;

        // Slight bobbing
        this.y += Math.sin(this.animationPhase * 4) * 5 * deltaTime;

        // Trunk swing handled in draw
        this.rotation = this.direction > 0 ? 0 : Math.PI;
    }

    draw(ctx, canvasWidth, canvasHeight) {
        // Initialize position on first draw (spawn in center)
        if (!this.initialized && canvasWidth && canvasHeight) {
            this.x = canvasWidth / 2;
            this.y = canvasHeight / 2;
            this.initialized = true;
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        ctx.globalAlpha = this.opacity;

        // Draw colorful, detailed animal
        switch (this.type) {
            case 'dog':
                this.drawColorfulDog(ctx);
                break;
            case 'bird':
                this.drawColorfulBird(ctx);
                break;
            case 'rabbit':
                this.drawColorfulRabbit(ctx);
                break;
            case 'butterfly':
                this.drawColorfulButterfly(ctx);
                break;
            case 'elephant':
                this.drawColorfulElephant(ctx);
                break;
        }

        ctx.restore();
    }

    drawColorfulDog(ctx) {
        // Brown/golden dog
        ctx.fillStyle = '#D2691E';

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 20, 60, 50, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.ellipse(0, -20, 50, 55, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.fillStyle = '#CD853F';
        ctx.beginPath();
        ctx.ellipse(30, 0, 35, 30, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.fillStyle = '#A0522D';
        ctx.beginPath();
        ctx.ellipse(-40, -40, 25, 45, -0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(15, -55, 25, 40, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-15, -25, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(10, -25, 5, 0, Math.PI * 2);
        ctx.fill();

        // Eye shine
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(-13, -27, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(12, -27, 2, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(50, 0, 6, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.strokeStyle = '#D2691E';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-50, 30);
        ctx.quadraticCurveTo(-70, 20, -65, 0);
        ctx.stroke();
    }

    drawColorfulBird(ctx) {
        // Blue/teal bird
        ctx.fillStyle = '#1E90FF';

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, 40, 50, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = '#4169E1';
        ctx.beginPath();
        ctx.ellipse(0, -40, 30, 30, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wings
        ctx.fillStyle = '#00BFFF';
        ctx.beginPath();
        ctx.moveTo(-20, -10);
        ctx.quadraticCurveTo(-60, -20, -70, 0);
        ctx.quadraticCurveTo(-60, 20, -30, 20);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(20, -10);
        ctx.quadraticCurveTo(60, -20, 70, 0);
        ctx.quadraticCurveTo(60, 20, 30, 20);
        ctx.closePath();
        ctx.fill();

        // Wing details
        ctx.strokeStyle = '#87CEEB';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(-40 - i * 8, -5);
            ctx.lineTo(-45 - i * 8, 15);
            ctx.stroke();
        }

        // Beak
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.moveTo(15, -40);
        ctx.lineTo(35, -38);
        ctx.lineTo(15, -36);
        ctx.closePath();
        ctx.fill();

        // Eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(8, -43, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(9, -44, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Tail feathers
        ctx.fillStyle = '#4169E1';
        ctx.beginPath();
        ctx.moveTo(-10, 35);
        ctx.lineTo(-15, 60);
        ctx.lineTo(-5, 60);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(0, 40);
        ctx.lineTo(-2, 65);
        ctx.lineTo(2, 65);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(10, 35);
        ctx.lineTo(5, 60);
        ctx.lineTo(15, 60);
        ctx.closePath();
        ctx.fill();
    }

    drawColorfulRabbit(ctx) {
        // White/pink rabbit
        ctx.fillStyle = '#F5F5F5';

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 20, 50, 60, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.ellipse(0, -25, 45, 50, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.beginPath();
        ctx.ellipse(-20, -75, 18, 55, -0.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(20, -75, 18, 55, 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Inner ears (pink)
        ctx.fillStyle = '#FFB6C1';
        ctx.beginPath();
        ctx.ellipse(-20, -75, 8, 40, -0.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(20, -75, 8, 40, 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Cheeks
        ctx.fillStyle = '#F5F5F5';
        ctx.beginPath();
        ctx.ellipse(-30, -10, 20, 25, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(30, -10, 20, 25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-15, -30, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(15, -30, 5, 0, Math.PI * 2);
        ctx.fill();

        // Eye shine
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(-13, -32, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(17, -32, 2, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.fillStyle = '#FFB6C1';
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(-5, -5);
        ctx.lineTo(5, -5);
        ctx.closePath();
        ctx.fill();

        // Whiskers
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-30, -15);
        ctx.lineTo(-55, -18);
        ctx.moveTo(-30, -10);
        ctx.lineTo(-55, -10);
        ctx.moveTo(30, -15);
        ctx.lineTo(55, -18);
        ctx.moveTo(30, -10);
        ctx.lineTo(55, -10);
        ctx.stroke();

        // Fluffy tail
        ctx.fillStyle = '#F5F5F5';
        ctx.beginPath();
        ctx.arc(-35, 40, 20, 0, Math.PI * 2);
        ctx.fill();
    }

    drawColorfulButterfly(ctx) {
        // Colorful butterfly with gradients

        // Body
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.ellipse(0, 0, 8, 50, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.arc(0, -55, 10, 0, Math.PI * 2);
        ctx.fill();

        // Upper wings - left (purple to pink)
        const gradient1 = ctx.createRadialGradient(-50, -30, 10, -50, -30, 50);
        gradient1.addColorStop(0, '#FF00FF');
        gradient1.addColorStop(0.5, '#FF69B4');
        gradient1.addColorStop(1, '#FFB6C1');

        ctx.fillStyle = gradient1;
        ctx.beginPath();
        ctx.moveTo(-8, -30);
        ctx.bezierCurveTo(-30, -60, -70, -65, -75, -35);
        ctx.bezierCurveTo(-78, -15, -68, 0, -45, 0);
        ctx.bezierCurveTo(-25, -5, -12, -15, -8, -25);
        ctx.closePath();
        ctx.fill();

        // Upper wings - right (blue to cyan)
        const gradient2 = ctx.createRadialGradient(50, -30, 10, 50, -30, 50);
        gradient2.addColorStop(0, '#00BFFF');
        gradient2.addColorStop(0.5, '#1E90FF');
        gradient2.addColorStop(1, '#87CEEB');

        ctx.fillStyle = gradient2;
        ctx.beginPath();
        ctx.moveTo(8, -30);
        ctx.bezierCurveTo(30, -60, 70, -65, 75, -35);
        ctx.bezierCurveTo(78, -15, 68, 0, 45, 0);
        ctx.bezierCurveTo(25, -5, 12, -15, 8, -25);
        ctx.closePath();
        ctx.fill();

        // Lower wings - left (orange to yellow)
        const gradient3 = ctx.createRadialGradient(-40, 25, 10, -40, 25, 35);
        gradient3.addColorStop(0, '#FFA500');
        gradient3.addColorStop(0.5, '#FFD700');
        gradient3.addColorStop(1, '#FFFF99');

        ctx.fillStyle = gradient3;
        ctx.beginPath();
        ctx.moveTo(-8, 15);
        ctx.bezierCurveTo(-28, 25, -52, 38, -58, 50);
        ctx.bezierCurveTo(-58, 58, -48, 60, -38, 55);
        ctx.bezierCurveTo(-22, 45, -12, 30, -8, 20);
        ctx.closePath();
        ctx.fill();

        // Lower wings - right (green to lime)
        const gradient4 = ctx.createRadialGradient(40, 25, 10, 40, 25, 35);
        gradient4.addColorStop(0, '#32CD32');
        gradient4.addColorStop(0.5, '#00FF00');
        gradient4.addColorStop(1, '#90EE90');

        ctx.fillStyle = gradient4;
        ctx.beginPath();
        ctx.moveTo(8, 15);
        ctx.bezierCurveTo(28, 25, 52, 38, 58, 50);
        ctx.bezierCurveTo(58, 58, 48, 60, 38, 55);
        ctx.bezierCurveTo(22, 45, 12, 30, 8, 20);
        ctx.closePath();
        ctx.fill();

        // Wing patterns (dots)
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(-55, -40, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(55, -40, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-55, -40, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(55, -40, 4, 0, Math.PI * 2);
        ctx.fill();

        // Antennae
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -65);
        ctx.quadraticCurveTo(-15, -80, -18, -88);
        ctx.moveTo(0, -65);
        ctx.quadraticCurveTo(15, -80, 18, -88);
        ctx.stroke();

        ctx.fillStyle = '#FF00FF';
        ctx.beginPath();
        ctx.arc(-18, -88, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(18, -88, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    drawColorfulElephant(ctx) {
        // Gray elephant
        ctx.fillStyle = '#A9A9A9';

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, 90, 70, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.ellipse(0, -10, 70, 60, 0, 0, Math.PI * 2);
        ctx.fill();

        // Trunk
        ctx.fillStyle = '#808080';
        ctx.beginPath();
        ctx.moveTo(45, 20);
        ctx.bezierCurveTo(65, 50, 60, 85, 50, 110);
        ctx.bezierCurveTo(40, 113, 32, 110, 35, 100);
        ctx.bezierCurveTo(43, 80, 43, 50, 38, 20);
        ctx.closePath();
        ctx.fill();

        // Trunk lines
        ctx.strokeStyle = '#696969';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(42, 30 + i * 15, 10, -Math.PI / 2, Math.PI / 2, false);
            ctx.stroke();
        }

        // Ears
        ctx.fillStyle = '#A9A9A9';
        ctx.beginPath();
        ctx.ellipse(-60, -10, 45, 60, -0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(60, -10, 45, 60, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Inner ears (darker)
        ctx.fillStyle = '#808080';
        ctx.beginPath();
        ctx.ellipse(-60, -5, 30, 45, -0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(60, -5, 30, 45, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(-15, -20, 6, 0, Math.PI * 2);
        ctx.fill();

        // Eye shine
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(-13, -22, 2, 0, Math.PI * 2);
        ctx.fill();

        // Tusk
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.moveTo(28, 15);
        ctx.lineTo(38, 45);
        ctx.lineTo(33, 45);
        ctx.lineTo(23, 18);
        ctx.closePath();
        ctx.fill();

        // Legs (visible part)
        ctx.fillStyle = '#A9A9A9';
        ctx.beginPath();
        ctx.rect(-50, 55, 25, 40);
        ctx.fill();

        ctx.beginPath();
        ctx.rect(-20, 55, 25, 40);
        ctx.fill();

        ctx.beginPath();
        ctx.rect(10, 55, 25, 40);
        ctx.fill();
    }
}

class PuppetManager {
    constructor() {
        this.puppets = new Map(); // handedness -> Puppet
        this.combinedPuppet = null;
        this.animals = new Map(); // handedness -> Animal
        this.combinedAnimal = null;
        this.summonThreshold = 2.5; // seconds to hold before animal appears
    }

    updatePuppet(handedness, type, x, y, scale, rotation) {
        if (this.puppets.has(handedness)) {
            const puppet = this.puppets.get(handedness);
            // If type changed, reset hold time
            if (puppet.type !== type) {
                puppet.type = type;
                puppet.resetHoldTime();
                // Remove existing animal when gesture changes
                this.animals.delete(handedness);
            }
            puppet.targetX = x;
            puppet.targetY = y;
            puppet.targetScale = scale;
            puppet.rotation = rotation;
            puppet.targetOpacity = 1;
        } else {
            const puppet = new Puppet(type, x, y, scale, rotation);
            puppet.handedness = handedness;
            this.puppets.set(handedness, puppet);
        }
    }

    removePuppet(handedness) {
        if (this.puppets.has(handedness)) {
            this.puppets.get(handedness).targetOpacity = 0;
            setTimeout(() => {
                this.puppets.delete(handedness);
            }, 500);
        }
    }

    createCombinedPuppet(type, x, y, scale) {
        if (this.combinedPuppet) {
            this.combinedPuppet.type = type;
            this.combinedPuppet.targetX = x;
            this.combinedPuppet.targetY = y;
            this.combinedPuppet.targetScale = scale;
        } else {
            this.combinedPuppet = new Puppet(type, x, y, scale, 0);
        }
        this.combinedPuppet.targetOpacity = 1;
    }

    removeCombinedPuppet() {
        if (this.combinedPuppet) {
            this.combinedPuppet.targetOpacity = 0;
            setTimeout(() => {
                this.combinedPuppet = null;
            }, 500);
        }
    }

    update() {
        const deltaTime = 1/60; // Approximate frame time

        // Update puppets and check for animal summoning
        this.puppets.forEach((puppet, handedness) => {
            puppet.update();

            // Check if gesture held long enough to summon animal
            if (puppet.gestureHoldTime >= this.summonThreshold && !this.animals.has(handedness)) {
                // Summon the animal on the light wall (center of screen)!
                // Need to pass canvas dimensions to position in center
                const animal = new Animal(
                    puppet.type,
                    handedness
                );
                this.animals.set(handedness, animal);
            }
        });

        // Update animals
        this.animals.forEach(animal => animal.update(deltaTime));

        // Update combined puppet and animal
        if (this.combinedPuppet) {
            this.combinedPuppet.update();

            if (this.combinedPuppet.gestureHoldTime >= this.summonThreshold && !this.combinedAnimal) {
                this.combinedAnimal = new Animal(
                    this.combinedPuppet.type,
                    'Combined'
                );
            }
        }

        if (this.combinedAnimal) {
            this.combinedAnimal.update(deltaTime);
        }
    }

    draw(ctx, canvasWidth, canvasHeight) {
        // Draw combined puppet/animal if exists
        if (this.combinedPuppet && this.combinedPuppet.opacity > 0.01) {
            this.combinedPuppet.draw(ctx);
            if (this.combinedAnimal && this.combinedAnimal.opacity > 0.01) {
                this.combinedAnimal.draw(ctx, canvasWidth, canvasHeight);
            }
        } else {
            // Draw individual puppets
            this.puppets.forEach(puppet => {
                if (puppet.opacity > 0.01) {
                    puppet.draw(ctx);
                }
            });

            // Draw individual animals on top
            this.animals.forEach(animal => {
                if (animal.opacity > 0.01) {
                    animal.draw(ctx, canvasWidth, canvasHeight);
                }
            });
        }
    }

    hasPuppets() {
        return this.puppets.size > 0 || this.combinedPuppet !== null;
    }
}
