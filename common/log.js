/**
 * Created by bulusli on 2014/10/22.
 */
var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'file',
            filename: 'access.log',
            maxLogSize: 1024*1024*1024,
            backups: 4
        }
    ],
    replaceConsole: true
});

module.exports = log4js.getLogger('dviewLog');

