# HTML Knit
Knit together multiple HTML, CSS and JavaScript files into a single HTML file.
<p align="center">
  <a href="https://nodei.co/npm/html-knit/"><img src="https://nodei.co/npm/html-knit.png?downloads=true&stars=true" alt="npm installnfo" /></a>
</p>

## Usage 

### Installation
```
npm i html-knit
```
or 
```
yarn add html-knit
```

### Usage
```js
const html_knit = require('html-knit');

html_knit.knit("output.html", "input.html", "styles1.css", "script1.js" ...);
```

### Arguments
1. The first argument specifies the location to output the knitted HTML file. It must be in the `.html` extension. If this file already exists, it will be overwritten. 
2. Any number of files can be provided as arguments following that. Upto 1 HTML file can be provided as as the input argument but is not mandatory. Any number of `.css` or `.js` files can be provided. No other file extensions are supported as of now.  

> **Disclaimer:** This module is still in it's beta phase. Please use at your own risk. Feel free to open an issue to report bugs or feature requests.
