

var editorContent = "";
var editorFile = "";

function writeEditorContent(content)
{
    console.log(content);
}

function loadFileContent(fileContent)
{
    var event = new CustomEvent('load-content', { 'detail': fileContent });
    var textArea = document.getElementById("content");
    textArea.dispatchEvent(event);
    console.log(fileContent);
}

// listeners for plugin events
self.port.on('load-file-content', loadFileContent);

// listeners for editor events
var textArea = document.getElementById("content");
textArea.addEventListener('save-content', function onsavecontent(event) {
    writeEditorContent(event.detail);
  }, false);


