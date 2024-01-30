function TextTool() {
    this.icon = "assets/text.png";
    this.name = "TextTool";
    this.texts = [];

    this.draw = function () {
        // Draw existing texts on the screen
        for (var i = 0; i < this.texts.length; i++) {
            textSize(this.texts[i].size);
            fill(255);
            text(this.texts[i].content, this.texts[i].x, this.texts[i].y);
        }

        if (mouseIsPressed) {
            if (keyIsPressed) {
                // Get the entered key and add it to the texts array
                var content = key;
                var size = 16; // You can set the initial size as needed
                this.texts.push({
                    content: content,
                    size: size,
                    x: mouseX,
                    y: mouseY
                });
            }
        }
    }

    this.keyPressed = function () {
        // Check if any key is pressed
        if (keyIsPressed) {
            // Get the entered key and add it to the texts array
            var content = key;
            var size = 16; // You can set the initial size as needed
            this.texts.push({
                content: content,
                size: size,
                x: mouseX,
                y: mouseY
            });
        }
    }
}
