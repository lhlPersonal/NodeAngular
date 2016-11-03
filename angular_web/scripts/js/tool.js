/**
 * Created by bulusli on 2016/6/3.
 */
"use strict";
function doTransfer() {
    let originIds = $("#originIds").val();
    if (originIds) {
        //if (originIds.indexOf("/*") != -1) {
        //    let reg = /(\/*)[^\r\n]+(\*\/)/g;
        //    originIds = originIds.replace(reg, "");
        //}
        let arr = originIds.split("}");
        if (arr && arr.length > 0) {
            let newArr = Array.from(arr, item=> {
                if (item && item.trim()) {
                    return item.substring(item.indexOf(":") + 1).replace("}", "");
                }
            });
            $("#transferIds").val("{_id:{$in:[" + newArr.filter((item)=> {
                    if (item && item.trim()) {
                        return item;
                    }
                }).join(",") + "]}}"
            )
        }
    }
}

function doClear() {
    $("#transferIds").val("");
    $("#originIds").val("");
}

