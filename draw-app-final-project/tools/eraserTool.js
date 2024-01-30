function EraserTool() {
    this.icon = "assets/eraser.png";
	this.name = "eraser";
    
    var sliderValue = 5;

	this.draw = function(){
		//if the mouse is pressed
        stroke(255);
        strokeWeight(0);
        fill(255);
		if(mouseIsPressed){
            fill(255,255,255);
            ellipse(mouseX, mouseY, sliderValue);
        }
    }

    strokeWeight(0);
    
    //when the tool is deselected update the pixels to just show the drawing and
	this.unselectTool = function() {
        loadPixels();
		updatePixels();
		//clear options
		select(".options").html("");
        fill(255);
	};
    
    this.populateOptions = function() {
    // Clear the content initially
    select(".options").html('');
    var parentElement = select(".options").elt;
        
      let sliderValueP = createP('Eraser Size: ' + sliderValue);
      sliderValueP.parent(parentElement);
      sliderValueP.id('slider-value');

      // Create a slider with a range from 1 to 20
      var slider = createSlider(1, 100, 5);
      slider.parent(parentElement);

      // Set an input event listener to update the variable when the slider changes
      slider.input(() => {
        sliderValue = slider.value();
        fill(0);
        let paragraph = select('#slider-value');
        paragraph.html('Eraser Size: ' + sliderValue);
      });
    }
}