const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

// Directory path for the source files
const srcDirectory = path.join(__dirname, 'src');

// Generate JSON documentation using TypeDoc
const typedocCommand = `npx typedoc --out docs --json docs.json ${srcDirectory}`;
childProcess.execSync(typedocCommand);

// Convert JSON to HTML using typedoc-plugin-markdown
const typedocMarkdownCommand = `npx typedoc-plugin-markdown --json docs.json --output docs`;
childProcess.execSync(typedocMarkdownCommand);

// Delete the intermediate JSON file
fs.unlinkSync(path.join(__dirname, 'docs.json'));

console.log('HTML documentation generated successfully!');
