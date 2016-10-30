/**
 * Created by bulusli on 2014/10/13.
 */

var ilistDAO = require('../mongo_dao/ilist_dao');
var log = require('../common/log');

var ilistSvce = {
    addDev: function (req, res) {
        var name = req.body.name || '';
        name = name.trim();
        if (!name) {
            res.send({error: 'name can not be empty'});
        }
        ilistDAO.addDev(name, function (err, result) {
            if (err) {
                res.send({error: err.message});
            }
            res.send(result);
        });
    },
    updateDev: function (req, res) {
        var name = req.query.name;
        var did = req.query._id;

        if (!name) {
            res.send({error: 'name can not be empty'});
        }

        if (!did) {
            res.send({error: 'id can not be empty'});
        }
        name = name.trim();
        ilistDAO.updateDev({name: name, _id: did}, function (err) {
            if (err) {
                res.send({error: err.message});
            }
            res.send({success: 'success'});
        });
    },
    delDev: function (req, res) {
        var did = req.query.id;
        did = did.trim();
        if (!did) {
            res.send({error: 'id can not be empty'});
        }
        ilistDAO.delDev(did, function (err) {
            if (err) {
                res.send({error: err.message});
            }
            res.send({success: 'true'});
        });
    },
    getAllDevs: function (req, res) {
        ilistDAO.getAllDevs(function (err, result) {
            if (err) {
                res.send({error: err.message});
            }
            res.send(result);
        });
    },
    getDev: function (req, res) {
        var id = req.query.id;
        if (!id) {
            res.send({error: 'id can not be empty'});
        }
        ilistDAO.findDevById(id, function (err, result) {
            if (err) {
                res.send({error: err.message});
            }
            res.send(result);
        });
    },
    getData: function (req, res) {
        ilistDAO.findPagedDevs(req.query, function (err, result) {
            if (err) {
                res.send({error: err.message});
            }
            res.send(result);
        });
    },
    bacthSave: function (req, res) {
        ilistDAO.batchSave(function (err) {
            if (err) {
                res.send({error: err.message});
            }
            res.send({success: "success"});
        })
    }
};

function ilistHandler(req, res) {
    var urlPara = req.path;

    log.info('--------inventory list handler start--------');
    if (urlPara === '/svr/inv/show') {
        ilistSvce.getAllDevs(req, res);
    }
    if (urlPara === '/svr/inv/add') {
        ilistSvce.addDev(req, res);
    }
    if (urlPara === '/svr/inv/del') {
        ilistSvce.delDev(req, res);
    }
    if (urlPara === '/svr/inv/update') {
        ilistSvce.updateDev(req, res);
    }
    if (urlPara === '/svr/inv/getDev') {
        ilistSvce.getDev(req, res);
    }
    if (urlPara === '/svr/inv/getDevData') {
        ilistSvce.getData(req, res);
    }
    if (urlPara === '/svr/inv/batchInsert') {
        ilistSvce.bacthSave(req, res);
    }
}

module.exports = ilistHandler;
