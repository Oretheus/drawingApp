function ScissorsTool(backgroundColor) {
    this.icon = "assets/scissors.png";
    this.name = "scissors";

    var selectMode = 0;
    var selectedArea = {};
    var selectedPixels;
    var canvasStates = [];
    
    var h = new HelperFunctions();

    this.draw = function () {
        if (selectMode == 1) {
            updatePixels();

            noStroke();
            fill(255, 0, 0, 100);
            rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
        }
    }

    this.unselectTool = function () {
        loadPixels();
        updatePixels();
        // clear options
        select(".options").html("");
    };

    this.populateOptions = function () {
        select(".options").html('');

        var parentElement = select(".options").elt;

        // Save canvas state before paste
        canvasStates.push(get());

        console.log(canvasStates);

        if (parentElement) {
            var selectButton = createButton('Select Area');
            selectButton.id('selectButton');
            selectButton.parent(parentElement);
            selectButton.mousePressed(function () {
                if (selectMode == 0) {
                    selectMode++;
                    selectButton.html("Cut");
                    loadPixels();
                } else if (selectMode == 1) {
                    selectMode++;
                    selectButton.html("End paste");

                    updatePixels();
                    selectedPixels = get(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                    noStroke();
                    fill(backgroundColor.r, backgroundColor.g, backgroundColor.b);
                    rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
                } else if (selectMode == 2) {
                    selectMode = 0;
                    loadPixels();
                    selectedArea = {
                        x: 0,
                        y: 0,
                        w: 100,
                        h: 100
                    };
                    selectButton.html("Select Area");
                }
            });

            var undoButton = createButton('Undo');
            undoButton.id('undoButton');
            undoButton.parent(parentElement);
            undoButton.mousePressed(function () {
                if (canvasStates.length > 0) {
                    // Restore the canvas to the previous state
                    image(canvasStates.pop(), 0, 0);
                } else if (canvasStates.length == 0) {
                    alert("No more undos left");
                }
            });
        }
    }

    this.mousePressed = function () {
        if (selectMode == 1) {
            selectedArea.x = mouseX;
            selectedArea.y = mouseY;
        } else if (selectMode == 2 && h.mousePressOnCanvas()) {
            image(selectedPixels, mouseX, mouseY);

            // Save canvas state after paste
            canvasStates.push(get());
        }
    }

    this.mouseDragged = function () {
        if (selectMode == 1) {
            var w = mouseX - selectedArea.x;
            var h = mouseY - selectedArea.y;

            selectedArea.w = w;
            selectedArea.h = h;
        }
    }
}
