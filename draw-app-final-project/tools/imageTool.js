function ImageTool() {
    this.icon = "assets/imageTool.png";
    this.name = "Image";
    
    this.uploadedImage = null;
    this.rotationAngle = 0;
    this.scaleFactor = 1;
    this.undoStack = [];

    var self = this;
    var uploadImageButton;
    var h = new HelperFunctions();

    this.draw = function() {
        if (self.uploadedImage && mouseIsPressed && h.mousePressOnCanvas()) {
            push();
            translate(mouseX, mouseY);
            rotate(self.rotationAngle);
            scale(self.scaleFactor);
            image(self.uploadedImage, -self.uploadedImage.width / 2, -self.uploadedImage.height / 2);
            pop();
        }
    };

    this.handleFile = function(file) {
        if (file.type == 'image') {
            // Store the current state before updating the image
            self.undoStack.push({
                uploadedImage: self.uploadedImage,
                rotationAngle: self.rotationAngle,
                scaleFactor: self.scaleFactor
            });

            self.uploadedImage = loadImage(file.data);
            // Reset rotation and scaling when a new image is loaded
            self.rotationAngle = 0;
            self.scaleFactor = 1;
        } else {
            alert("Invalid upload type!");
            uploadImageButton.elt.value = null;
        }
    };

    this.rotateImage = function(angleDelta) {
        // Rotate the image by the specified angle
        self.rotationAngle += angleDelta;
    };

    this.resizeImage = function(scaleFactor) {
        // Resize the image by the specified factor
        self.scaleFactor *= scaleFactor;
    };

    this.undo = function() {
        // Undo the last image placement
        /* Couldn't get it how i wanted to i decided to just keep the button to clear the chosen file */
        if (self.undoStack.length > 0) {
            var previousState = self.undoStack.pop();
            self.uploadedImage = previousState.uploadedImage;
            self.rotationAngle = previousState.rotationAngle;
            self.scaleFactor = previousState.scaleFactor;
            uploadImageButton.elt.value = null;
        } else {
            alert("Nothing to unselect.")
        }
    };

    this.unselectTool = function() {
        // Reset everything
        self.uploadedImage = null;
        self.rotationAngle = 0;
        self.scaleFactor = 1;
        self.undoStack = [];
        select(".options").html("");
    };

    this.populateOptions = function() {
        // Clear the content initially
        select(".options").html('');

        // Get the parent element
        var parentElement = select(".options").elt;

        if (parentElement) {
            // Append each button individually
            uploadImageButton = createFileInput(self.handleFile);
            uploadImageButton.parent(parentElement);

            var rotateText = createP('Rotation: 0 degrees');
            rotateText.parent(parentElement);

            var rotateSlider = createSlider(0, TWO_PI, 0, 0.01);
            rotateSlider.parent(parentElement);

            var sizeText = createP('Size: 100%');
            sizeText.parent(parentElement);

            var resizeSlider = createSlider(0.5, 2, 1, 0.01);
            resizeSlider.parent(parentElement);

            // Update rotation and resizing based on sliders and update text
            rotateSlider.input(function() {
                self.rotationAngle = rotateSlider.value();
                rotateText.html('Rotation: ' + degrees(self.rotationAngle) + ' degrees');
            });

            resizeSlider.input(function() {
                self.scaleFactor = resizeSlider.value();
                sizeText.html('Size: ' + int(self.scaleFactor * 100) + '%');
            });

            // Add buttons for undo
            var undoButton = createButton('Unselect file');
            undoButton.parent(parentElement);
            undoButton.mousePressed(function () {
                self.undo();
            });
        } else {
            console.error("Parent element not found");
        }
    };
}
