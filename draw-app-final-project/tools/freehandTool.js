function FreehandTool(sharedColor){
	//set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "freehand";

	var thicknessValue = 5;

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){
	
		//if the mouse is pressed
		if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				strokeWeight(thicknessValue);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};

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
			
		  let sliderValue1 = createP('Tickness: ' + thicknessValue);
		  sliderValue1.parent(parentElement);
		  sliderValue1.id('thickness-value');
	
		  // Create a slider with a range from 1 to 20
		  var slider1 = createSlider(1, 100, 5);
		  slider1.parent(parentElement);

		  let sliderValue2 = createP('Opacity: ' + sharedColor.opacity);
		  sliderValue2.parent(parentElement);
		  sliderValue2.id('opacity-value');

		  var slider2 = createSlider(0, 1.0, 1.0, 0.01);
		  slider2.parent(parentElement);
	
		  // Set an input event listener to update the variable when the slider changes
		  slider1.input(() => {
			thicknessValue = slider1.value();
			fill(0);
			let paragraph = select('#thickness-value');
			paragraph.html('Tickness: ' + thicknessValue);
		  });

		  slider2.input(() => {
			sharedColor.opacity = slider2.value();
			fill(0);
			let paragraph = select('#opacity-value');
			paragraph.html('Opacity: ' + sharedColor.opacity);
		  });
		}
}