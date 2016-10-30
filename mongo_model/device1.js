/**
 * Created by bulusli on 2014/10/23.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义device对象模型
var devScheme = new Schema({
    devName: String,
    IP: String,
    MAC: String,
    HW:String,
    FW:String
});

//访问device对象模型
module.exports = mongoose.model('device1', devScheme);