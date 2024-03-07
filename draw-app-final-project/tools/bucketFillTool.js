function BucketFillTool(backgroundColor, sharedColor) {
    this.icon = "assets/fillBucket.png";
	this.name = "BucketFill";

    var h = new HelperFunctions();

    this.draw = function () {
        if (mouseIsPressed && h.mousePressOnCanvas()) {
            background(sharedColor.r,sharedColor.g,sharedColor.b);
            // In order to communicate with other classes
            backgroundColor.r = sharedColor.r;
            backgroundColor.g = sharedColor.g;
            backgroundColor.b = sharedColor.b;
        }
    }
}