const fs = require('fs');

function read(filename) {
    return new Promise((res, rej) => (fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            rej();
        }
        var stream = data.toString() + "\n";
        res(stream);
    })
    ))
}

async function knit() {
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

    var js_stream = "";
    var css_stream = "";
    var input_stream = "";

    for (var i = 0; i < js_files.length; i++) {
        js_stream += await read(js_files[i]);
    }

    for (var i = 0; i < css_files.length; i++) {
        css_stream += await read(css_files[i]);
    }
    if (js_files.length > 0) {
        js_stream = "<script>\n" + js_stream + "</script>\n";
    }
    if (css_files.length > 0) {
        css_stream = "<style>\n" + css_stream + "</style>\n";
    }

    if (input_html != undefined) {
        input_stream = await read(input_html);
    }
    else {
        input_stream = "";
    }

    var headEnd = -1;
    for (var i = 0; i < input_stream.length; i++) {
        if (input_stream.substring(i, i + 7) == "</head>") {
            headEnd = i;
            break;
        }
    }

    var bodyEnd = -1;
    for (var i = 0; i < input_stream.length; i++) {
        if (input_stream.substring(i, i + 7) == "</body>") {
            bodyEnd = i;
            break;
        }
    }

    var knitted_stream = ""
    if (bodyEnd != -1) {
        knitted_stream = input_stream.substring(0, bodyEnd) + js_stream + input_stream.substring(bodyEnd);
    }
    else {
        knitted_stream = input_stream + js_stream;
    }

    if (headEnd != -1) {
        knitted_stream = knitted_stream.substring(0, headEnd) + css_stream + knitted_stream.substring(headEnd);
    }
    else {
        knitted_stream = css_stream + knitted_stream;
    }

    console.log(knitted_stream)
}

module.exports = {
    knit: knit
}