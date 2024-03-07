    var canvases = []; // Array to store canvases
    var currentCanvasIndex = 0; // Index of the currently active canvas

function getCurrentCanvas() {
    return canvases[currentCanvasIndex];
}


function addTab() {
      // Create a new canvas
      var newCanvas = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
      newCanvas.parent("content");

      // Add the new canvas to the array
      canvases.push(newCanvas);

      // Set the current canvas to the newly created canvas
      currentCanvasIndex = canvases.length - 1;


      // Create a new tab
      var tab = document.createElement("div");
      tab.className = "tab";
      tab.innerHTML = canvases.length + " <span class='close-tab' onclick='closeTab(" + (canvases.length - 1) + ")'>x</span>";

      // Attach an event listener to the tab element
      tab.addEventListener('click', function() {
        // Extract the index from the tab's HTML content
        var index = parseInt(this.innerHTML.match(/\d+/)[0]) - 1;
        switchTab(index);
        console.log(index);
      });

      // Append the tab to the tabs container
      document.getElementById("tabs-container").insertBefore(tab, document.querySelector(".add-tab"));
    }


    function switchTab(index) {
      if (currentCanvasIndex == index || canvases.length === 0) {
        return;
      }

      var tabs = document.querySelectorAll('.tab');

      if (tabs.length > 0 && index >= 0 && index < canvases.length) {
        tabs.forEach(tab => {
          tab.style.backgroundColor = ''; // Reset background color
        });

        canvases[currentCanvasIndex] = get();

        // Set the background color of the active tab
        tabs[index].style.backgroundColor = 'aqua';

        currentCanvasIndex = index;

        // Clear the background
        background(255);

        // Draw the content of the selected canvas
        image(canvases[currentCanvasIndex], 0, 0);
      }
    }




    function closeTab(index) {
      if (canvases.length > 1 && index >= 0 && index < canvases.length) {
        // Remove the tab element
        var tab = document.querySelector(".tab:nth-child(" + (index + 1) + ")");
        tab.parentNode.removeChild(tab);  // <-- Error occurs here

        // Remove the canvas element
        canvases.splice(index, 1);

        // Switch to the first canvas (if it's not the last tab)
        if (index == currentCanvasIndex && index != 0) {
          switchTab(0);
        }
      }
    }



    // Function to initialize tabs
    function initializeTabs() {
      var addTabButton = document.createElement("div");
      addTabButton.className = "add-tab";
      addTabButton.innerHTML = "+";
      addTabButton.onclick = addTab;
      document.getElementById("tabs-container").appendChild(addTabButton);
    }

    // Call the initializeTabs function when the page is loaded
    window.onload = function () {
      initializeTabs();
      addTab(); // Add an initial canvas
      addTab();
      switchTab(0);
    };
