var editorContent = "";
var editorFile = "";

function writeFileContent(content)
{
    self.port.emit('save-file-content', content); 
}

function loadFileContent(fileContent)
{
    var event = new CustomEvent('load-content', { 'detail': fileContent });
    var textArea = document.getElementById("content");
    textArea.dispatchEvent(event);
}

// listeners for plugin events
self.port.on('load-file-content', loadFileContent);


// listeners for editor events
var textArea = document.getElementById("content");
textArea.addEventListener('save-content', function onsavecontent(event) {
    writeFileContent(event.detail);
  }, false);


