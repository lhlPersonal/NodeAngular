/**
 * 处理angularjs和nodejs前后端的url跳转
 * Created by bulusli on 2014/10/20.
 */

function urlMapping(req, res) {
    if (req.path.indexOf('/svr') === -1) {
        angularHandler(req, res);
    } else {
        serverHandler(req, res);
    }
}

/**
 *需要跳转到angular前端的url处理函数
 *
 * @param req
 * @param res
 */
function angularHandler(req, res) {
    var path = req.path;
    var basicPath = 'angular_web/views/';

    if (path.indexOf('/ilist') !== -1) {
        res.sendfile(basicPath + 'inventory.html');
    }
}

/**
 * 服务端请求数据的url的处理函数
 *
 * @param req
 * @param res
 */
function serverHandler(req, res) {
    var path = req.path;

    if (path.indexOf('/inv') !== -1) {
        var ilistSvce = require('../service/ilist_epx_svce');

        ilistSvce(req, res);
    }
}

module.exports = urlMapping;