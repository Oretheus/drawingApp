function BucketFillTool() {
    this.icon = "assets/fillBucket.png";
	this.name = "BucketFill";

    var h = new HelperFunctions();

    this.draw = function () {
        if (mouseIsPressed) {
            background(r,g,b);
        }
    }
}