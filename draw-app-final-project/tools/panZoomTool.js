function PanZoomTool() {
  this.icon = "assets/panZoomTool.png";
  this.name = "Pan Zoom Tool";

  // Variable for zoom
  var scaleFactor = 1;
  var once = false;

  
  this.draw = function () {
    // Apply zoom transformation to the current canvas
    var currentCanvas = getCurrentCanvas();
    currentCanvas.scale(scaleFactor);
  
    
    // Zooming logic
    if (mouseIsPressed && mouseButton == LEFT) {
      if (!once) {
        alert("I could not get this tool to work. For some reason it would not scale anything already drawn on canvas.");
        once = true;
      }
      

      // Zoom in on left-click
      const zoomFactor = 1.05;
      const zoomCenterX = mouseX;
      const zoomCenterY = mouseY;
  
      // Update the scale factor for the current canvas
      scaleFactor *= zoomFactor;
  
      // Adjust the translation to keep the zoom center fixed
      currentCanvas.translate((1 - zoomFactor) * zoomCenterX, (1 - zoomFactor) * zoomCenterY);
  
      // Ensure that scaleFactor doesn't go below a certain value
      scaleFactor = max(0.1, scaleFactor);
    }


    push();
    scale(scaleFactor);
    pop();
    
  };
}
