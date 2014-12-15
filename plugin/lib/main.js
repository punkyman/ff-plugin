var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;

var editorPage = editorPrefToPage(prefs.editorName);
var editorTab;

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
function editorPrefToPage(prefValue)
{
    return "editor-" + prefValue + ".html";
}

function onEditorPrefChange(prefName) {
    editorPage = editorPrefToPage(prefs.editorName);
}
require("sdk/simple-prefs").on("editorName", onEditorPrefChange);

function openFile(tab) {
    var fileName = tab.url;
    console.log(fileName);
}

function attachScript(tab) {
  editorTab = tab;
  var worker = tab.attach({ contentScriptFile: data.url("editor-code.js") });
  tab.on('load', openFile);

  tabs.removeListener('ready',attachScript);
}

// show a new tab when the user clicks the button.
function handleClick(state) {
    // open local page that embeds the editor
    tabs.open(data.url(editorPage));
    // when tab is ready, attach plugin-specific code
    tabs.on('ready', attachScript);
        //worker.port.emit("drawBorder", "red");
}


