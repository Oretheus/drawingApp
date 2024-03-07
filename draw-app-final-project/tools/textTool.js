function TextTool() {
    this.icon = "assets/text.png";
    this.name = "TextTool";
    this.texts = [];
    this.currentText = "";
    this.textSize = 16;
    this.fontOptions = ["Arial", "Helvetica", "Courier New", "Times New Roman"];
    this.selectedFont = "Arial";
    this.input = null;
    this.rotationAngle = 0;
    this.initialClickX = 0;
    this.initialClickY = 0;

    var isTyping = false;

    var h = new HelperFunctions();

    this.draw = function () {
        if (this.texts.length > 0) {
            for (var i = 0; i < this.texts.length; i++) {
                push();
                translate(this.texts[i].x + this.texts[i].width / 2, this.texts[i].y + this.texts[i].height / 2);
                rotate(radians(this.texts[i].rotationAngle));
                noStroke();
                fill(0);
                textFont(this.texts[i].font, this.texts[i].size);
                text(this.texts[i].content, -this.texts[i].width / 2, -this.texts[i].height / 2);
                pop();
            }
            this.texts = [];
        }

        if (this.input) {
            this.input.position(this.initialClickX + 60, this.initialClickY + 20);
            this.input.elt.style.transform = 'rotate(' + this.rotationAngle + 'deg)';
        }

        if (mouseIsPressed && h.mousePressOnCanvas() && !this.input) {
            isTyping = true;
            this.initialClickX = mouseX;
            this.initialClickY = mouseY;
            this.createInputBox();
        }

        if (keyIsPressed) {
            if (keyCode == ENTER) {
                if (this.input && this.input.value()) {
                    isTyping = false;

                    var newTextInput = {
                        content: this.input.value(),
                        size: this.textSize,
                        font: this.selectedFont,
                        x: this.initialClickX,
                        y: this.initialClickY,
                        rotationAngle: this.rotationAngle,
                        width: textWidth(this.input.value()), // Calculate the width of the text
                        height: this.textSize // Assume a constant height for simplicity
                    };

                    this.texts.push(newTextInput);
                    this.input.remove();
                    this.input = null;
                }
            }
        }
    }

    this.unselectTool = function () {
        loadPixels();
        updatePixels();
        select(".options").html("");
        fill(255);
    };

    this.populateOptions = function () {
        select(".options").html('');
        var parentElement = select(".options").elt;
    
        var textSizeValueP = createP('Text Size: ' + this.textSize);
        textSizeValueP.parent(parentElement);
        textSizeValueP.id('slider-value');
    
        var textSizeSlider = createSlider(16, 100, 16);
        textSizeSlider.parent(parentElement);
        textSizeSlider.input(() => {
            if (isTyping) {
                alert("You can not change the size whilst typing!");
                textSizeSlider.value(this.textSize);
                return;
            }
    
            this.textSize = textSizeSlider.value();
            fill(0);
            var paragraph = select('#slider-value');
            paragraph.html('Text Size: ' + this.textSize);
        });
    
        var fontDropdownLabel = createP('Font: ');
        fontDropdownLabel.parent(parentElement);
    
        var fontDropdown = createSelect();
        fontDropdown.parent(parentElement);
        fontDropdown.option("Arial");
        fontDropdown.option("Helvetica");
        fontDropdown.option("Courier New");
        fontDropdown.option("Times New Roman");
        fontDropdown.changed(() => {
            if (isTyping) {
                alert("You can not change the font whilst typing!");
                fontDropdown.value(this.selectedFont);
                return;
            }
    
            this.selectedFont = fontDropdown.value();
            if (this.input) {
                this.input.style('font-family', this.selectedFont);
            }
        });
    
        var rotationSliderLabel = createP('Rotation: ');
        rotationSliderLabel.parent(parentElement);
    
        var rotationSlider = createSlider(0, 360, 0);
        rotationSlider.parent(parentElement);
        rotationSlider.input(() => {
            this.rotationAngle = rotationSlider.value();
            if (this.input) {
                this.input.elt.style.transform = 'rotate(' + this.rotationAngle + 'deg)';
            }
        });
    }    

    this.createInputBox = function () {
        this.input = createInput();
        this.input.size(this.textSize * 5, this.textSize * 2);
        this.input.style('border', 'none');
        this.input.attribute('placeholder', 'Type here');
        this.input.style('font-size', this.textSize + 'px');
        this.input.style('font-family', this.selectedFont);
        this.input.position(this.initialClickX + 60, this.initialClickY + 20);
        this.input.elt.focus();
    }
}
