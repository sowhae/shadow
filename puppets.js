/**
 * Shadow Puppet Renderer
 * Defines and renders different puppet shapes based on hand gestures
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
        this.color = this.getColorForType(type);
        this.opacity = 0;
        this.targetOpacity = 1;
        this.handedness = null; // 'Left' or 'Right'
    }

    getColorForType(type) {
        const colors = {
            'dog': { shadow: 'rgba(40, 40, 60, 0.9)', glow: 'rgba(100, 100, 200, 0.3)' },
            'bird': { shadow: 'rgba(60, 40, 40, 0.9)', glow: 'rgba(200, 100, 100, 0.3)' },
            'rabbit': { shadow: 'rgba(40, 60, 40, 0.9)', glow: 'rgba(100, 200, 100, 0.3)' },
            'butterfly': { shadow: 'rgba(60, 40, 60, 0.9)', glow: 'rgba(200, 100, 200, 0.3)' },
            'elephant': { shadow: 'rgba(50, 50, 50, 0.9)', glow: 'rgba(150, 150, 200, 0.3)' }
        };
        return colors[type] || colors['dog'];
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

        // Draw glow effect
        ctx.shadowColor = this.color.glow;
        ctx.shadowBlur = 30;

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
        ctx.fillStyle = this.color.shadow;

        // Head
        ctx.beginPath();
        ctx.ellipse(0, 0, 80, 100, 0, 0, Math.PI * 2);
        ctx.fill();

        // Snout
        ctx.beginPath();
        ctx.ellipse(0, 40, 50, 60, 0, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.beginPath();
        ctx.ellipse(-70, -40, 40, 70, -0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(70, -40, 40, 70, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Eyes (lighter)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(-30, -20, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(30, -20, 8, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.beginPath();
        ctx.arc(0, 50, 12, 0, Math.PI * 2);
        ctx.fill();
    }

    drawBird(ctx) {
        ctx.fillStyle = this.color.shadow;

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, 60, 80, 0, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.ellipse(0, -60, 50, 50, 0, 0, Math.PI * 2);
        ctx.fill();

        // Beak
        ctx.beginPath();
        ctx.moveTo(30, -60);
        ctx.lineTo(80, -60);
        ctx.lineTo(30, -40);
        ctx.closePath();
        ctx.fill();

        // Wings
        ctx.beginPath();
        ctx.ellipse(-80, 0, 60, 30, -0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(80, 0, 60, 30, 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Eye
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(15, -70, 6, 0, Math.PI * 2);
        ctx.fill();

        // Wing details
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(-60 - i * 15, -10);
            ctx.lineTo(-60 - i * 15, 20);
            ctx.stroke();
        }
    }

    drawRabbit(ctx) {
        ctx.fillStyle = this.color.shadow;

        // Head
        ctx.beginPath();
        ctx.ellipse(0, 0, 70, 80, 0, 0, Math.PI * 2);
        ctx.fill();

        // Long ears
        ctx.beginPath();
        ctx.ellipse(-30, -100, 25, 80, -0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(30, -100, 25, 80, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Inner ears (lighter)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(-30, -100, 12, 50, -0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(30, -100, 12, 50, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(-25, -10, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(25, -10, 8, 0, Math.PI * 2);
        ctx.fill();

        // Nose
        ctx.fillStyle = this.color.shadow;
        ctx.beginPath();
        ctx.moveTo(0, 20);
        ctx.lineTo(-8, 30);
        ctx.lineTo(8, 30);
        ctx.closePath();
        ctx.fill();

        // Whiskers
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-40, 20);
        ctx.lineTo(-80, 15);
        ctx.moveTo(-40, 30);
        ctx.lineTo(-80, 35);
        ctx.moveTo(40, 20);
        ctx.lineTo(80, 15);
        ctx.moveTo(40, 30);
        ctx.lineTo(80, 35);
        ctx.stroke();
    }

    drawButterfly(ctx) {
        ctx.fillStyle = this.color.shadow;

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, 15, 80, 0, 0, Math.PI * 2);
        ctx.fill();

        // Upper wings
        ctx.beginPath();
        ctx.ellipse(-60, -40, 70, 60, -0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(60, -40, 70, 60, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Lower wings
        ctx.beginPath();
        ctx.ellipse(-50, 30, 50, 50, 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(50, 30, 50, 50, -0.2, 0, Math.PI * 2);
        ctx.fill();

        // Wing patterns
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(-60, -40, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(60, -40, 20, 0, Math.PI * 2);
        ctx.fill();

        // Antennae
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -80);
        ctx.quadraticCurveTo(-20, -100, -25, -110);
        ctx.moveTo(0, -80);
        ctx.quadraticCurveTo(20, -100, 25, -110);
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(-25, -110, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(25, -110, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    drawElephant(ctx) {
        ctx.fillStyle = this.color.shadow;

        // Head
        ctx.beginPath();
        ctx.ellipse(0, -20, 90, 70, 0, 0, Math.PI * 2);
        ctx.fill();

        // Trunk
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.quadraticCurveTo(80, 60, 70, 100);
        ctx.quadraticCurveTo(65, 110, 60, 100);
        ctx.quadraticCurveTo(70, 60, 40, 20);
        ctx.closePath();
        ctx.fill();

        // Ears
        ctx.beginPath();
        ctx.ellipse(-80, -20, 60, 80, -0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(80, -20, 60, 80, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Eye
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(-20, -30, 8, 0, Math.PI * 2);
        ctx.fill();

        // Tusk
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.moveTo(30, 10);
        ctx.lineTo(40, 50);
        ctx.lineTo(35, 50);
        ctx.lineTo(25, 10);
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
