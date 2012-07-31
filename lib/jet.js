var Q = require('q'),
    CP = require('child_process'),
    PATH = require('./path');

module.exports = require('coa').Cmd()
    .name(PATH.basename(process.argv[1]))
    .title(['Tools', '' +
        '2'].join('\n'))
    .helpful()
    .opt()
        .name('version').title('Show version')
        .short('v').long('version')
        .flag()
        .only()
        .act(function() {
            return JSON.parse(require('fs').readFileSync(
                PATH.join(__dirname, '..', 'package.json')))
                    .version;
        })
        .end();