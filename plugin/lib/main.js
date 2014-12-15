var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;

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

// handle editor preference in plugin settings
var editorName = prefs.editorName;
function onEditorPrefChange(prefName) {
    editorName = prefs.editorName;
}
require("sdk/simple-prefs").on("editorName", onEditorPrefChange);

// show a new tab when the user clicks the button.
function handleClick(state) {

var editorPage = "editor-" + editorName + ".html";
console.log(editorPage);

// open local page that embeds the editor
tabs.open(data.url(editorPage));
// when tab is ready, attach plugin-specific code
tabs.on('ready', function(tab) {
  var worker = tab.attach({ contentScriptFile: data.url("editor-code.js") });
   });
    //worker.port.emit("drawBorder", "red");
}


