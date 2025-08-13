# 3D Point Visualizer

A web-based 3D point visualization tool built with Three.js that allows you to create and explore clusters of 3D points.

## Features

- **Point Density Control**: Adjust how tightly packed the points are (0.1 - 2.0)
- **Point Radius Control**: Change the size of individual points (0.1 - 5.0)
- **Number of Points**: Control the total number of points displayed (100 - 10,000)
- **Interactive 3D View**: Navigate around the visualization with mouse and scroll

## Controls

### Mouse Controls
- **Left Click + Drag**: Rotate the camera around the point cluster
- **Scroll Wheel**: Zoom in and out of the visualization

### UI Controls
- **Point Density**: Higher values create more spread-out clusters
- **Point Radius**: Larger values make points more visible
- **Number of Points**: More points create denser, more complex visualizations

## How to Use

1. Open `index.html` in a modern web browser
2. Use the sliders to adjust the visualization parameters
3. Click and drag to rotate around the 3D scene
4. Scroll to zoom in and out
5. Experiment with different combinations of settings

## Technical Details

- Built with Three.js for 3D graphics
- Uses WebGL for hardware-accelerated rendering
- Responsive design that adapts to window resizing
- Efficient point generation with clustering algorithms

## Browser Requirements

- Modern browser with WebGL support
- Chrome, Firefox, Safari, or Edge (latest versions recommended)

## File Structure

- `index.html` - Main HTML file
- `styles.css` - Styling and layout
- `script.js` - 3D visualization logic
- `README.md` - This documentation

## Future Enhancements

- Color customization options
- Different clustering algorithms
- Export functionality
- Animation controls
- Performance optimizations for larger point sets
