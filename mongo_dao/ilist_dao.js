/**
 * Created by bulusli on 2014/10/13.
 */
var util = require('util');
var Device = require('../mongo_model/device');
var Device1 = require('../mongo_model/device1');

var ilistDAO = {
    addDev: function (name, callback) {
        var dev = new Device();
        dev.name = name;
        dev.save(function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, dev);
            }
        });
    },
    updateDev: function (dev, callback) {
        Device.update({_id: dev._id}, { $set: { name: dev.name}}, {}, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        })
    },
    delDev: function (id, callback) {
        this.findDevById(id, function (err, doc) {
            if (err)
                callback(err);
            else {
                util.log(util.inspect(doc));
                doc.remove();
                callback(null);
            }
        });
    },
    getAllDevs: function (callback) {
        Device.find({}, function (err, doc) {
            if (err) {
                callback(err, null);
            }
            callback(null, doc);
        });
    },
    findDevById: function (id, callback) {
        Device.findOne({_id: id}, function (err, doc) {
            if (err) {
                callback(err, null);
            }
            callback(null, doc);
        });
    },
    batchSave: function (callback) {
        var arr = [];

        for (var i = 0; i < 1000; i++) {
            var dev = new Device1();

            dev.devName = "dev" + (i + 1);
            dev.IP = "172.18.190." + (i / 4) + (i % 4);
            dev.MAC = "00-11-22-33-44-55-66-77-88";
            dev.HW = Math.random().toString();
            dev.FW = Math.random().toString();

            arr.push(dev);
        }
        Device1.create(arr, function (err) {
            if (err) {
                callback(err);
            }
            callback(null);
        })
    },
    findPagedDevs: function (query, callback) {
        Device1
            .find({ })
            .skip(query.pageSize * (query.pageIndex - 1)).limit(query.pageSize)
            .exec(function (err, docs) {
                if (err) {
                    callback(err);
                }
                callback(null, docs);
            });
    }
};

module.exports = ilistDAO;