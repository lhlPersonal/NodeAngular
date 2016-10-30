/**
 * Created by bulusli on 2014/10/13.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义device对象模型
var devScheme = new Schema({
    name: String,
    IP: String,
    MAC: String,
    discoverTime: {type: Date, default: Date.now}
});

//访问device对象模型
module.exports = mongoose.model('device', devScheme);