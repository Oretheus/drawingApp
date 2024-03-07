// Displays and handles the colour wheel.
function ColourWheel(sharedColor) {
    this.selectedColour = "black";

    var self = this;

    // Create container for color wheel and information
    var container = createDiv();
    container.id("colorContainer");
    select(".colourWheel").child(container);

    // Create color wheel with external library
    var colorWheel = new iro.ColorPicker("#colorContainer", {
        width: 120,
        color: "black",
        borderWidth: 1,
    });

    // Create element to display RGB values
    var colorInfoR = createP("RGB: 0, 0, 0");

    // Add color information to the container
    container.child(colorInfoR);

    // Update layout styles - Tried to make it how I wanted to
    container.style("display", "flex");
    container.style("flex-direction", "column");
    container.style("align-items", "flex-start");
    colorInfoR.style("margin-top", "10px");
    colorInfoR.style("margin-left", "2px");
    colorInfoR.style("margin-bottom", "50px");
    colorInfoR.style("font-size", "16px");

    colorWheel.on("color:change", function (color) {
        self.selectedColour = color.hexString;

        // Update RGB values and color information
        this.rgbValues = color.rgb;
        sharedColor.r = this.rgbValues.r;
        sharedColor.g = this.rgbValues.g;
        sharedColor.b = this.rgbValues.b;

        colorInfoR.style("color", self.selectedColour);
        colorInfoR.html("RGB: " + sharedColor.r + ", " + sharedColor.g + ", " + sharedColor.b + "    " + "HEX: " + self.selectedColour);

    });
}
