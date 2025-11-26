/**
 * Gesture Recognition System
 * Detects hand shapes and movements for puppet control
 */

class GestureRecognizer {
    constructor() {
        this.handHistory = new Map(); // handedness -> previous positions
        this.gestureState = new Map(); // handedness -> current gesture
        this.swipeThreshold = 0.05; // Minimum movement for swipe detection
        this.pinchThreshold = 0.05; // Distance threshold for pinch
    }

    /**
     * Analyze hand landmarks to determine gesture type
     */
    recognizeGesture(landmarks, handedness) {
        const gesture = {
            type: 'unknown',
            confidence: 0,
            isPinching: false,
            isOpen: false,
            isClosed: false,
            position: this.getHandCenter(landmarks),
            scale: 1.0,
            rotation: 0
        };

        // Calculate finger extensions
        const fingerStates = this.getFingerStates(landmarks);
        const extendedCount = fingerStates.filter(s => s).length;

        // Detect pinch gesture (thumb and index close together)
        const pinchDistance = this.getDistance(
            landmarks[4],  // Thumb tip
            landmarks[8]   // Index tip
        );
        gesture.isPinching = pinchDistance < this.pinchThreshold;

        // Detect open hand (4-5 fingers extended)
        gesture.isOpen = extendedCount >= 4;

        // Detect closed fist (0-1 fingers extended)
        gesture.isClosed = extendedCount <= 1;

        // Determine puppet type based on hand shape
        if (gesture.isPinching) {
            gesture.type = 'rabbit';
            gesture.confidence = 0.9;
        } else if (gesture.isOpen) {
            gesture.type = 'bird';
            gesture.confidence = 0.85;
        } else if (gesture.isClosed) {
            gesture.type = 'dog';
            gesture.confidence = 0.8;
        }

        // Calculate hand size for scaling
        gesture.scale = this.getHandScale(landmarks);

        // Calculate hand rotation
        gesture.rotation = this.getHandRotation(landmarks);

        // Detect swipe gestures
        gesture.swipe = this.detectSwipe(handedness, gesture.position);

        this.gestureState.set(handedness, gesture);
        return gesture;
    }

    /**
     * Get finger extension states
     * Returns array of booleans [thumb, index, middle, ring, pinky]
     */
    getFingerStates(landmarks) {
        const fingerTips = [4, 8, 12, 16, 20];
        const fingerPips = [3, 6, 10, 14, 18];
        const states = [];

        for (let i = 0; i < fingerTips.length; i++) {
            const tip = landmarks[fingerTips[i]];
            const pip = landmarks[fingerPips[i]];

            if (i === 0) {
                // Thumb: check horizontal distance
                const base = landmarks[2];
                states.push(this.getDistance(tip, base) > this.getDistance(pip, base));
            } else {
                // Other fingers: check vertical distance
                states.push(tip.y < pip.y);
            }
        }

        return states;
    }

    /**
     * Get center point of hand
     */
    getHandCenter(landmarks) {
        const wrist = landmarks[0];
        const middleMcp = landmarks[9];
        return {
            x: (wrist.x + middleMcp.x) / 2,
            y: (wrist.y + middleMcp.y) / 2,
            z: (wrist.z + middleMcp.z) / 2
        };
    }

    /**
     * Calculate hand scale based on palm size
     */
    getHandScale(landmarks) {
        const wrist = landmarks[0];
        const middleMcp = landmarks[9];
        const indexMcp = landmarks[5];
        const pinkyMcp = landmarks[17];

        const palmLength = this.getDistance(wrist, middleMcp);
        const palmWidth = this.getDistance(indexMcp, pinkyMcp);

        // Normalize to a base scale (typical hand measurements)
        const scale = (palmLength + palmWidth) / 0.3;
        return Math.max(0.5, Math.min(2.5, scale));
    }

    /**
     * Calculate hand rotation angle
     */
    getHandRotation(landmarks) {
        const wrist = landmarks[0];
        const middleMcp = landmarks[9];

        const dx = middleMcp.x - wrist.x;
        const dy = middleMcp.y - wrist.y;

        return Math.atan2(dy, dx);
    }

    /**
     * Detect swipe gestures based on movement history
     */
    detectSwipe(handedness, currentPos) {
        const swipe = {
            detected: false,
            direction: null,
            velocity: { x: 0, y: 0 }
        };

        if (!this.handHistory.has(handedness)) {
            this.handHistory.set(handedness, []);
        }

        const history = this.handHistory.get(handedness);
        history.push({ ...currentPos, time: Date.now() });

        // Keep last 10 positions
        if (history.length > 10) {
            history.shift();
        }

        if (history.length >= 5) {
            const recent = history.slice(-5);
            const dx = recent[4].x - recent[0].x;
            const dy = recent[4].y - recent[0].y;
            const dt = (recent[4].time - recent[0].time) / 1000; // seconds

            swipe.velocity.x = dx / dt;
            swipe.velocity.y = dy / dt;

            const speed = Math.sqrt(dx * dx + dy * dy);

            if (speed > this.swipeThreshold) {
                swipe.detected = true;

                if (Math.abs(dx) > Math.abs(dy)) {
                    swipe.direction = dx > 0 ? 'right' : 'left';
                } else {
                    swipe.direction = dy > 0 ? 'down' : 'up';
                }
            }
        }

        return swipe;
    }

    /**
     * Detect two-hand gestures
     */
    detectTwoHandGesture(leftLandmarks, rightLandmarks) {
        if (!leftLandmarks || !rightLandmarks) {
            return null;
        }

        const leftCenter = this.getHandCenter(leftLandmarks);
        const rightCenter = this.getHandCenter(rightLandmarks);

        const distance = this.getDistance(leftCenter, rightCenter);
        const midpoint = {
            x: (leftCenter.x + rightCenter.x) / 2,
            y: (leftCenter.y + rightCenter.y) / 2,
            z: (leftCenter.z + rightCenter.z) / 2
        };

        const leftGesture = this.gestureState.get('Left');
        const rightGesture = this.gestureState.get('Right');

        // Detect combined gestures
        let combinedType = null;

        // Butterfly: both hands open and close together
        if (leftGesture?.isOpen && rightGesture?.isOpen && distance < 0.3) {
            combinedType = 'butterfly';
        }
        // Elephant: both hands closed and overlapping
        else if (leftGesture?.isClosed && rightGesture?.isClosed && distance < 0.2) {
            combinedType = 'elephant';
        }

        if (combinedType) {
            return {
                type: combinedType,
                position: midpoint,
                scale: (leftGesture.scale + rightGesture.scale) / 2,
                distance: distance
            };
        }

        return null;
    }

    /**
     * Calculate Euclidean distance between two points
     */
    getDistance(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = (p1.z || 0) - (p2.z || 0);
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    /**
     * Clear history for a hand
     */
    clearHand(handedness) {
        this.handHistory.delete(handedness);
        this.gestureState.delete(handedness);
    }

    /**
     * Get current gesture for a hand
     */
    getGesture(handedness) {
        return this.gestureState.get(handedness);
    }

    /**
     * Get gesture description for UI
     */
    getGestureDescription(handedness) {
        const gesture = this.gestureState.get(handedness);
        if (!gesture) return 'No hand detected';

        const descriptions = {
            'bird': '🐦 Bird (Open Hand)',
            'dog': '🐕 Dog (Fist)',
            'rabbit': '🐰 Rabbit (Pinch)'
        };

        return descriptions[gesture.type] || 'Unknown';
    }
}
