const Service = require('node-windows').Service;
const join = require('path').join;

const config = {
    name: 'Warranty Checker',
    description: 'Run TypeScript on Windows Service.',
    script: join(__dirname, 'dist/index.js'),
};

const svc = new Service(config);

svc.on('install', function () {
    svc.start();
});

svc.on('uninstall', function () {
    console.log('Uninstall complete.');
    console.log('The service exists: ', svc.exists);
});

module.exports = { i: svc.install(), u: svc.uninstall() };
require('make-runnable');
