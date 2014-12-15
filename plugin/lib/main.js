var data = require("sdk/self").data;
var tabs = require("sdk/tabs");
var prefs = require("sdk/simple-prefs").prefs;
var fileIO = require("sdk/io/file");

var editorPage = editorPrefToPage(prefs.editorName);
var editorUrl = "";
var editorWorker;
var contentUrl = "";

var fileHeader = "<!DOCTYPE html><html><head><meta charset=\"utf-8\" /><!-- <title>document</title> --></head><body>";
var fileFooter = "</body></html>";
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

function saveFile(content)
{
    var contentPath = contentUrl.substr(7);
    var textWriter = fileIO.open(contentPath, "w");
    textWriter.write(fileHeader);
    textWriter.write(content);
    textWriter.write(fileFooter);
    textWriter.close();
}

function openFile(tab) {
    var fileUrl = tab.url;
    if(fileUrl != editorUrl)
    {
        // tab has loaded an other page than the editor; save the file path, and reload the editor
        contentUrl = fileUrl;
        tab.url = editorUrl;   
    }
    else
    {
        // attach the editor plugin script in case of editor page loading
        editorWorker = tab.attach({ contentScriptFile: data.url("editor-code.js") });
        if(contentUrl.length > 0)
        {
            // skip the beginning of url that contains file://
            var contentPath = contentUrl.substr(7);
            var textReader = fileIO.open(contentPath, "r");
            var fileContent = textReader.read();
            textReader.close();
            editorWorker.port.on('save-file-content', saveFile);
            editorWorker.port.emit('load-file-content', fileContent);
        }
    }
}

function attachLoadCallback(tab) {
  // load happens after ready, this hack works
  tab.on('load', openFile);
  tabs.removeListener('ready',attachLoadCallback);
}

// show a new tab when the user clicks the button.
function handleClick(state) {
    // open local page that embeds the editor
    editorUrl = data.url(editorPage);
    tabs.open(editorUrl);
    // when tab is ready, attach plugin-specific code
    tabs.on('ready', attachLoadCallback);
        //worker.port.emit("drawBorder", "red");
}


