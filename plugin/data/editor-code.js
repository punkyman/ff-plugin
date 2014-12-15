var editorText = "";

// attach an event listener for save events
var textArea = document.getElementById("content");
textArea.addEventListener('save-text', function onsavetext(event) {
    writeEditorText(event.detail);
  }, false);

function writeEditorText(text)
{
    console.log(text);
}

