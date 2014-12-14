var data = require("sdk/self").data;
var tabs = require("sdk/tabs");

// Create a button in toolbar
require("sdk/ui/button/action").ActionButton({
  id: "show-panel",
  label: "Show Panel",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

// show a new tab when the user clicks the button.
function handleClick(state) {
// open local page that embeds the editor
tabs.open(data.url("editor.html"));
// when tab is ready, attach plugin-specific code
tabs.on('ready', function(tab) {
  tab.attach({ contentScriptFile: data.url("editor-code.js") });
   });
}


