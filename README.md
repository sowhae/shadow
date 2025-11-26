# Hand Tracking Shadow Puppets 🐾

An interactive web application that uses real-time hand tracking to create dynamic shadow puppets. Make different hand shapes and gestures to bring puppets to life on your screen!

## Features

### 🎭 Puppet Types

**Single Hand Puppets:**
- **🐦 Bird** - Open hand with all fingers extended
- **🐕 Dog** - Closed fist
- **🐰 Rabbit** - Pinch gesture (thumb and index finger together)

**Two-Hand Combined Puppets:**
- **🦋 Butterfly** - Both hands open and close together
- **🐘 Elephant** - Both hands in fists, overlapping

### 🎮 Gestures & Controls

- **Movement**: Simply move your hands to move the puppets across the screen
- **Scaling**: Spread or contract your hand to scale puppet size
- **Type Switching**: Change hand shapes to switch between puppet types
- **Swipe Detection**: Fast hand movements create dynamic effects
- **Two-Hand Mode**: Use both hands to create combined puppet forms

### 🎨 Visual Effects

- **Animated Backgrounds**: Soft, shifting colored gradients
- **Glow Effects**: Puppets have subtle glow halos
- **Hand Outlines**: Real-time visualization of hand skeleton
- **Smooth Animations**: Fluid transitions between puppet states

### 📱 UI Elements

- **Gesture Indicator**: Shows current detected gesture at the top
- **Hand Status**: Displays state of left and right hands
- **Instructions Panel**: Toggleable control reference (bottom-left)
- **Loading Screen**: Initialization feedback

## How to Use

### Requirements

- Modern web browser (Chrome, Edge, or Firefox recommended)
- Webcam access
- Good lighting conditions for optimal hand tracking

### Getting Started

1. Open `index.html` in your web browser
2. Allow camera permissions when prompted
3. Wait for hand tracking to initialize
4. Position your hands in front of the camera
5. Try different hand shapes to create puppets!

### Tips for Best Results

- **Lighting**: Ensure your hands are well-lit
- **Background**: Plain backgrounds work best
- **Distance**: Keep hands 1-2 feet from camera
- **Movement**: Move smoothly for best tracking
- **Contrast**: Wear contrasting colors to background

## Technical Details

### Technologies Used

- **MediaPipe Hands**: Google's ML-based hand tracking solution
- **HTML5 Canvas**: For rendering puppets and effects
- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Modern styling and animations

### Architecture

```
index.html          # Main HTML structure
style.css           # Styling and animations
app.js              # Main application logic & MediaPipe integration
gestures.js         # Gesture recognition system
puppets.js          # Puppet shapes and rendering
```

### Key Components

**ShadowPuppetApp** (`app.js`)
- Manages application lifecycle
- Integrates MediaPipe Hands
- Handles rendering loop
- Updates UI elements

**GestureRecognizer** (`gestures.js`)
- Analyzes hand landmarks
- Detects hand shapes (open, closed, pinch)
- Recognizes swipe gestures
- Identifies two-hand combinations

**PuppetManager** (`puppets.js`)
- Manages puppet instances
- Handles puppet rendering
- Smooth position/scale interpolation
- Combined puppet creation

**Puppet** (`puppets.js`)
- Individual puppet class
- Shape rendering (dog, bird, rabbit, butterfly, elephant)
- Animation and effects

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Recommended |
| Edge    | ✅ Recommended |
| Firefox | ✅ Supported |
| Safari  | ⚠️ May require HTTPS |
| Mobile  | ⚠️ Limited support |

## Privacy

- All processing happens locally in your browser
- No data is sent to external servers
- Camera feed is never recorded or stored
- No cookies or tracking

## Troubleshooting

**Camera not working:**
- Check browser permissions
- Ensure no other app is using the camera
- Try refreshing the page

**Poor tracking:**
- Improve lighting conditions
- Move closer to camera
- Clear background behind hands
- Ensure hands are fully visible

**Performance issues:**
- Close other browser tabs
- Use a more powerful device
- Lower browser zoom level

## Future Enhancements

- [ ] More puppet types (cat, fox, swan)
- [ ] Sound effects for gestures
- [ ] Screenshot/recording capability
- [ ] Customizable colors and themes
- [ ] Multi-user support
- [ ] Gesture-based games

## License

MIT License - Feel free to use and modify!

## Credits

Built with ❤️ using:
- [MediaPipe Hands](https://google.github.io/mediapipe/solutions/hands.html) by Google
- HTML5 Canvas API
- Modern Web Technologies

---

**Enjoy creating shadow puppets! 🎭✨**
