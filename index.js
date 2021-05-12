const fs = require('fs')

function knit() {
    let args = Array.from(arguments);

    var output_html = "";
    var input_html = undefined;
    var js_files = [];
    var css_files = [];

    // Check if number of args is correct
    if (args.length < 2) {
        console.error("Expected atleast 2 arguments. 1 Output file and atleast 1 Input file")
        return;
    }

    // If the first file is html
    if (args[0].slice(args[0].length - 5) === ".html") {
        output_html = args[0];
    }
    else {
        console.error("Expected a .html file as first argument for the output file");
        return;
    }

    // Sort the remaining files
    for (var i = 1; i < args.length; i++) {

        if (args[i].slice(args[i].length - 5) === ".html") {
            // HTML Input file
            if (input_html === undefined) {
                input_html = args[i];
            }
            else {
                console.error("Only 1 input HTML file is currently allowed");
                return;
            }
        }
        else if (args[i].slice(args[i].length - 3) === ".js") {
            // JS Input files
            js_files.push(args[i]);
        }
        else if (args[i].slice(args[i].length - 4) === ".css") {
            // CSS Input files
            css_files.push(args[i]);
        }
        else {
            // Other files
            console.error(`Only HTML, CSS and JS files allowed for now. Skipping ${args[i]}`);
        }
    }


    console.log(`${input_html},${output_html},${js_files},${css_files}`);
}
// output filename, input html, input css, input js
module.exports = {
    knit: knit
}