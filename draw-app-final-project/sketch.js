//global variables that will store the toolbox colour palette
//and the helper functions
var toolbox = null;
var colourW = null;
var helpers = null;
var canvasContainer;
var panZoomTool;
var scissorsTool;

// Using this to communicate between classes if needed of the color & opacity
var sharedColor = {
    r: 0,
    g: 0,
    b: 0,
    opacity: 1.0
};

var backgroundColor = {
    r: 255,
    g: 255,
    b: 255
};



function setup() {
    // create a canvas to fill the content div from index.html
    canvasContainer = select('#content');

    // create helper functions and the colour palette
    helpers = new HelperFunctions();
    colourW = new ColourWheel(sharedColor);

    // create a toolbox for storing the tools
    toolbox = new Toolbox();
    // add the tools to the toolbox.
    toolbox.addTool(new FreehandTool(sharedColor));
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new MirrorDrawTool());
    // tools that I've created are below
    toolbox.addTool(new EraserTool(backgroundColor));
    toolbox.addTool(new ShapesTool());
    toolbox.addTool(new BucketFillTool(backgroundColor, sharedColor));
    toolbox.addTool(new TextTool());
    toolbox.addTool(new ImageTool());

    scissorsTool = new ScissorsTool(backgroundColor);
    toolbox.addTool(scissorsTool);

    panZoomTool = new PanZoomTool();
    toolbox.addTool(panZoomTool);

    background(255);
}

function draw() {
    // call the draw function from the selected tool.
    // hasOwnProperty is a JavaScript function that tests
    // if an object contains a particular method or property
    // if there isn't a draw method the app will alert the user
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        fill(sharedColor.r, sharedColor.g, sharedColor.b, sharedColor.opacity * 255);
        stroke(sharedColor.r, sharedColor.g, sharedColor.b, sharedColor.opacity * 255);
        toolbox.selectedTool.draw();
        
        if (toolbox.selectedTool.name == "Pan Zoom Tool") {
           
        }
    } else {
        alert("It doesn't look like your tool has a draw method!");
    }
}

function getColor() {
    return colourW.selectedColour;
}

// Event listeners for mousePressed and mouseDragged in the main sketch
function mousePressed() {
    if (toolbox.selectedTool == panZoomTool) {
        panZoomTool.mousePressed();
    } else if (toolbox.selectedTool == scissorsTool) {
        scissorsTool.mousePressed();
    }
}

function mouseDragged() {
    if (toolbox.selectedTool == panZoomTool) {
        panZoomTool.mouseDragged();
    } else if (toolbox.selectedTool == scissorsTool) {
        scissorsTool.mouseDragged();
    }
}
