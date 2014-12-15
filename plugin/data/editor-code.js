var editorContent = "";

// attach an event listener for save events
var textArea = document.getElementById("content");
textArea.addEventListener('save-content', function onsavecontent(event) {
    writeEditorContent(event.detail);
  }, false);

function writeEditorContent(content)
{
    console.log(content);
}

