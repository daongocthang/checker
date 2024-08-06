const join = require('path').join;

export default {
    name: 'Warranty Checker',
    description: 'Run TypeScript on Windows Service.',
    script: join(__dirname, 'dist/index.js'),
};
