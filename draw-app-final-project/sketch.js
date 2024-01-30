//global variables that will store the toolbox colour palette
//and the helper functions
var toolbox = null;
var colourW = null;
var helpers = null;
var canvasContainer;

function setup() {
    //create a canvas to fill the content div from index.html
     canvasContainer = select('#content');
//    var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
//    c.parent("content");

    //create helper functions and the colour palette
    helpers = new HelperFunctions();
    colourW = new ColourWheel();

    //create a toolbox for storing the tools
    toolbox = new Toolbox();

    //add the tools to the toolbox.
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new MirrorDrawTool());
    //tools that I've created are below
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new ShapesTool());
    toolbox.addTool(new BucketFillTool());
    toolbox.addTool(new TextTool());
    background(255);
}

function draw() {
    //call the draw function from the selected tool.
    //hasOwnProperty is a JavaScript function that tests
    //if an object contains a particular method or property
    //if there isn't a draw method the app will alert the user
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } else {
        alert("it doesn't look like your tool has a draw method!");
    }
}

function getColor() {
    return colourW.selectedColour;
}
