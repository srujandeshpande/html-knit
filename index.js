const fs = require('fs')

function knit() {
    let args = Array.from(arguments);
    console.log(args);

    // Check if number of args is correct
    if (args.length < 2) {
        console.error("Expected atleast 2 arguments. 1 Output file and atleast 1 Input file")
    }
    if
    // console.log(`${filename},${html},${css},${js}`);
}
// output filename, input html, input css, input js
module.exports = {
    knit: knit
}