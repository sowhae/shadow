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
    }

    update() {
        // Smooth interpolation
        const smoothing = 0.15;
        this.x += (this.targetX - this.x) * smoothing;
        this.y += (this.targetY - this.y) * smoothing;
        this.scale += (this.targetScale - this.scale) * smoothing;
        this.opacity += (this.targetOpacity - this.opacity) * smoothing;
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

class PuppetManager {
    constructor() {
        this.puppets = new Map(); // handedness -> Puppet
        this.combinedPuppet = null;
    }

    updatePuppet(handedness, type, x, y, scale, rotation) {
        if (this.puppets.has(handedness)) {
            const puppet = this.puppets.get(handedness);
            puppet.type = type;
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
        this.puppets.forEach(puppet => puppet.update());
        if (this.combinedPuppet) {
            this.combinedPuppet.update();
        }
    }

    draw(ctx) {
        // Draw combined puppet if exists (it should be on top)
        if (this.combinedPuppet && this.combinedPuppet.opacity > 0.01) {
            this.combinedPuppet.draw(ctx);
        } else {
            // Draw individual puppets
            this.puppets.forEach(puppet => {
                if (puppet.opacity > 0.01) {
                    puppet.draw(ctx);
                }
            });
        }
    }

    hasPuppets() {
        return this.puppets.size > 0 || this.combinedPuppet !== null;
    }
}
