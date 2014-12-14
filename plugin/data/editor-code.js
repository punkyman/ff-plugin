// attach an event listener for save events
var textArea = document.getElementById("content");
textArea.addEventListener('save-text', function onsavetext(event) {
    self.port.emit("text-entered", event.detail); console.log(event.detail);
  }, false);

