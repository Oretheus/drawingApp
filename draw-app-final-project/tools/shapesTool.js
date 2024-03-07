function ShapesTool() {
    this.icon = "assets/shapesTool.png";
    this.name = "shapes";

    var selected = "";
    var currentShape = [];
    var editMode = false;
    var self = this;
    var startingPoint;
    var fillEnabled = false;

    var h = new HelperFunctions();

    this.draw = function () {
        if (fillEnabled == false) {
            noFill();
        } else {
            fill(getColor());
        }

        if (selected != "customShape" && !mouseIsPressed) {
            loadPixels();
        }

        updatePixels();

        if (selected == "customShape") {
            if (mouseIsPressed && h.mousePressOnCanvas()) {
                if (!editMode) {
                    currentShape.push({
                        x: mouseX,
                        y: mouseY
                    });
                } else {
                    for (var i = 0; i < currentShape.length; i++) {
                        if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15) {
                            currentShape[i].x = mouseX;
                            currentShape[i].y = mouseY;
                        }
                    }
                }
            }
        } else if (mouseIsPressed && h.mousePressOnCanvas()) {

            if (!startingPoint) {
                startingPoint = createVector(mouseX, mouseY);
            }

            if (selected == "square") {
                rectMode(CENTER);
                var sideLength = dist(startingPoint.x, startingPoint.y, mouseX, mouseY);
                rect(startingPoint.x, startingPoint.y, sideLength, sideLength);
            } else if (selected == "triangle") {
                var sideLength = dist(startingPoint.x, startingPoint.y, mouseX, mouseY);
                var height = (sqrt(3) / 2) * sideLength;

                var topX = startingPoint.x;
                var topY = startingPoint.y - height / 2;

                var leftX = startingPoint.x - sideLength / 2;
                var leftY = startingPoint.y + height / 2;

                var rightX = startingPoint.x + sideLength / 2;
                var rightY = startingPoint.y + height / 2;

                triangle(
                    topX, topY,
                    leftX, leftY,
                    rightX, rightY
                );
            } else if (selected == "circle") {
                var radius = dist(startingPoint.x, startingPoint.y, mouseX, mouseY) / 2;
                ellipse(startingPoint.x, startingPoint.y, radius * 2, radius * 2);
            } else if (selected == "star") {
                var outerRadius = dist(startingPoint.x, startingPoint.y, mouseX, mouseY);
                var innerRadius = outerRadius / 2.5;
                drawStar(startingPoint.x, startingPoint.y, 5, outerRadius, innerRadius);
            } else if (selected == "pentagon") {
                var radius = dist(startingPoint.x, startingPoint.y, mouseX, mouseY);
                drawPolygon(startingPoint.x + 50, startingPoint.y, 5, radius);
            } else if (selected == "octagon") {
                var radius = dist(startingPoint.x, startingPoint.y, mouseX, mouseY);
                drawPolygon(startingPoint.x, startingPoint.y, 8, radius);
            }

        } else {
            startingPoint = null;
        }

        beginShape();
        for (var i = 0; i < currentShape.length; i++) {
            vertex(currentShape[i].x, currentShape[i].y);
            if (editMode) {
                fill('red');
                ellipse(currentShape[i].x, currentShape[i].y, 15);
                noFill();
            }
        }
        endShape();
    };


    function drawStar(x, y, numPoints, outerRadius, innerRadius) {
        var angle = TWO_PI / numPoints;
        var halfAngle = angle / 2.0;
        beginShape();
        for (var a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
            var sx = x + cos(a) * outerRadius;
            var sy = y + sin(a) * outerRadius;
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * innerRadius;
            sy = y + sin(a + halfAngle) * innerRadius;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }

    function drawPolygon(x, y, sides, radius) {
        var angle = TWO_PI / sides;
        beginShape();
        for (var i = 0; i < sides; i++) {
          var sx = x + cos(angle * i) * radius;
          var sy = y + sin(angle * i) * radius;
          vertex(sx, sy);
        }
        endShape(CLOSE);
      }

    // when the tool is deselected update the pixels to just show the drawing and
    this.unselectTool = function() {
        updatePixels();
        // clear options
        select(".options").html("");
    };

    // adds a button and click handler to the options area. When clicked
    // toggle the line of symmetry between horizontal to vertical
    this.populateOptions = function() {
        // Clear the content initially
        select(".options").html('');

        // Get the parent element
        var parentElement = select(".options").elt;

        if (parentElement) {
            // Append each button individually
            var customShapeButton = createButton('Start Shape');
            customShapeButton.id('customShape');
            customShapeButton.parent(parentElement);

            var editShapeButton = createButton('Edit Shape');
            editShapeButton.id('editShape');
            editShapeButton.parent(parentElement);

            var fillShapeButton = createButton('No Fill');
            fillShapeButton.id('fillShape');
            fillShapeButton.parent(parentElement);

            var squareButton = createButton('');
            squareButton.id('square');
            squareButton.parent(parentElement);
            squareButton.child(createImg('assets/shapes/square.gif', 'Square').size(32, 32));

            var circleButton = createButton('');
            circleButton.id('circle');
            circleButton.parent(parentElement);
            circleButton.child(createImg('assets/shapes/circle.png', 'Circle').size(32, 32));

            var triangleButton = createButton('');
            triangleButton.id('triangle');
            triangleButton.parent(parentElement);
            triangleButton.child(createImg('assets/shapes/triangle.png', 'Triangle').size(32, 32));

            var starButton = createButton('');
            starButton.id('star');
            starButton.parent(parentElement);
            starButton.child(createImg('assets/shapes/star.png', 'Star').size(32, 32));

            var pentagonButton = createButton('');
            pentagonButton.id('pentagon');
            pentagonButton.parent(parentElement);
            pentagonButton.child(createImg('assets/shapes/pentagon.png', 'Pentagon').size(32, 32));
      
            var octagonButton = createButton('');
            octagonButton.id('octagon');
            octagonButton.parent(parentElement);
            octagonButton.child(createImg('assets/shapes/octagon.png', 'Octagon').size(32, 32));
            
            customShapeButton.mouseClicked(function() {
                if (customShapeButton.html() == "Start Shape") {
                    customShapeButton.html("Finish Shape");
                    selected = "customShape";
                } else {
                    if (editMode == true) {
                        alert("You must turn off edit mode in order to finish your custom shape!")
                        return;
                    }
                    customShapeButton.html("Start Shape");
                    loadPixels();
                    selected = "";
                    currentShape = [];
                }
            });

            editShapeButton.mouseClicked(function() {
                if (customShapeButton.html() == "Start Shape") {
                    alert("You have to start a shape in order to use this button!")
                    return;
                }

                if (editMode) {
                    editMode = false;
                    editShapeButton.html("Edit Shape");
                } else {
                    editMode = true;
                    editShapeButton.html("Add Vertices");
                }
            });

            fillShapeButton.mouseClicked(function() {
                if (fillShapeButton.html() == "No Fill") {
                    fillShapeButton.html("Fill");
                    fillEnabled = true;
                } else {
                    fillShapeButton.html("No Fill");
                    fillEnabled = false;
                }
                console.log(fillEnabled);
            });

            squareButton.mouseClicked(function() {
                selected = "square";
            });

            triangleButton.mouseClicked(function() {
                selected = "triangle";
            });

            circleButton.mouseClicked(function() {
                selected = "circle";
            });

            starButton.mouseClicked(function() {
                selected = "star";
            });

            pentagonButton.mouseClicked(function() {
                selected = "pentagon";
            });
        
            octagonButton.mouseClicked(function() {
                selected = "octagon";
            });
        } else {
            console.error("Parent element not found");
        }
    };
}
