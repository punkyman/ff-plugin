var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;
var fileIO = require("sdk/io/file");

var editorPage = editorPrefToPage(prefs.editorName);
var editorPath = "";
var editorWorker;
var contentFilename = "";

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
    if(fileName != editorPath)
    {
        // tab has loaded an other page than the editor; save the file path, and reload the editor
        contentFilename = fileName;
        tab.url = editorPath;   
    }
    else
    {
        editorWorker = tab.attach({ contentScriptFile: data.url("editor-code.js") });
        if(contentFilename.length > 0)
        {
            // skip the beginning of url that contains file://
            var contentPath = contentFilename.substr(7);
            var textReader = fileIO.open(contentPath, "r");
            var fileContent = textReader.read();
            textReader.close();
            editorWorker.port.emit('load-file-content', fileContent);
        }
    }
}

function attachLoadCallback(tab) {
  tab.on('load', openFile);
  tabs.removeListener('ready',attachLoadCallback);
}

// show a new tab when the user clicks the button.
function handleClick(state) {
    // open local page that embeds the editor
    editorPath = data.url(editorPage);
    tabs.open(editorPath);
    // when tab is ready, attach plugin-specific code
    tabs.on('ready', attachLoadCallback);
        //worker.port.emit("drawBorder", "red");
}


