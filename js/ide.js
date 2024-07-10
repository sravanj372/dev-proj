$(document).ready(function() {
    var editor = ace.edit("editor");
    var isDarkMode = false; // Set initial state to light mode
    editor.setTheme("ace/theme/chrome"); // Set initial theme to light mode
    editor.session.setMode("ace/mode/c_cpp");

    // Set initial font size
    editor.setFontSize("14px");

    window.changeLanguage = function() {
        var language = $("#languages").val();
        if (language == 'c' || language == 'cpp') {
            editor.session.setMode("ace/mode/c_cpp");
        } else if (language == 'php') {
            editor.session.setMode("ace/mode/php");
        } else if (language == 'python') {
            editor.session.setMode("ace/mode/python");
        } else if (language == 'node') {
            editor.session.setMode("ace/mode/javascript");
        }
    };

    window.changeFontSize = function() {
        var fontSize = $("#font-size").val();
        editor.setFontSize(fontSize + "px");
    };

    window.executeCode = function() {
        var code = editor.getValue();
        // Handle code execution here
        $(".output").html("<pre>" + code + "</pre>");
    };

    window.saveCode = function() {
        var code = editor.getValue();
        var language = $("#languages").val();
        var filename = $("#filename").val() || "Untitled";
        var extension = "";

        switch(language) {
            case "c": extension = ".c"; break;
            case "cpp": extension = ".cpp"; break;
            case "php": extension = ".php"; break;
            case "python": extension = ".py"; break;
            case "node": extension = ".js"; break;
            default: extension = ".txt";
        }

        var blob = new Blob([code], { type: "text/plain;charset=utf-8" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename + extension;
        link.click();
    };

    window.toggleTheme = function() {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            $('body').addClass('dark-mode');
            editor.setTheme("ace/theme/monokai");
            $(".theme-icon").text("🌙");
        } else {
            $('body').removeClass('dark-mode');
            editor.setTheme("ace/theme/chrome");
            $(".theme-icon").text("☀️");
        }
    };
});
