(function() {

    var saveCmd = {
        modes:{wysiwyg:1,source:1 },
        readOnly: 1,

        exec: function( editor ) {
            editor.fire("save", editor.getData());
        }
    };

    var pluginName = 'createSave';

    // Register a plugin named "createSave".
    CKEDITOR.plugins.add( pluginName, {
        init: function( editor ) {

            // overwrite the "save" command.. ;)
           editor.addCommand( "save", saveCmd);
        }
    });
})();
