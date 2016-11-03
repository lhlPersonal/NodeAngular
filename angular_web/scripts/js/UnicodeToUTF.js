/**
 * Created by bulusli on 2016/6/12.
 */

/**
 * Unicode convert to UTF-8
 * @param unicode unicode 16进制值
 * @constructor
 */
function UnicodeToUTF8(unicode) {
    if (unicode) {
        let unicodeInt = Number.parseInt(unicode, 16);
        if (Number.isInteger(unicodeInt) && unicodeInt >= 0) {
            let byteCount = 0;
            if (unicode <= 0x7F) {  //0-7bit
                byteCount = 1;
            } else if (unicode <= 0x7FF) {  //8-11bit  110xxxxx 10xxxxxx
                byteCount = 2;
            } else if (unicode <= 0xFFFF) {  //12-16bit  1110xxxx 10xxxxxx 10xxxxxx
                byteCount = 3;
            } else if (unicode <= 0x10FFFF) { //17-21bit 11110xxx 10xxxxxx  10xxxxxx 10xxxxxx
                byteCount = 4;
            } else {
                throw  new Error(String.raw `unicode ${unicode} is not defined!!!!`);
            }
            return getUTF8CodePointArr(unicode, [], true, byteCount);
        }
        return undefined;
    }
}

/**
 *
 * @param unicode 需要编码的Unicode字符串
 * @param codePointArr  //utf-8数组
 * @param firstCycle //是否为第一次转码
 * @param _byteCount  //需要的字节数，用来判断移位操作
 * @returns {Array} 转换后的UTF-8编码数组
 */
function getUTF8CodePointArr(unicode, codePointArr = [], firstCycle = false, _byteCount = 1) {
    let byteCount = firstCycle ? _byteCount : Math.ceil(unicode.toString(2).length / 6);
    let byteLenToMove = (byteCount - 1) * 6; //首字节填充数需要位移的二进制位
    let left = (unicode >> byteLenToMove); //每次循环时，首字节的填充二进制数
    let leftBase = 0;

    if (firstCycle) {
        if (byteCount > 1) {
            leftBase = 0xFF >> (8 - byteCount) << (8 - byteCount);  //11111111
        }
        //if (byteCount == 1) {
        //    //  leftBase = 0; //ascii保持原样
        //} else if (byteCount == 2) {
        //    leftBase = 0xC0; //0x11000000
        //} else if (byteCount == 3) {
        //    leftBase = 0xE0; //0x11100000
        //} else if (byteCount == 4) {
        //    leftBase = 0xF0; //0x11110000
        //}
    } else {
        leftBase = 0x0080;  //0x10000000
    }
    codePointArr.push(leftBase | left);

    if (byteLenToMove > 0) {  //直到转换完成为止
        let right = (unicode - (left << byteLenToMove));  //取右边的二进制数，思路是：unicode码数-左边的二进制向右移动需要的位数后再次左移相同的位数=右边二进制，当然也可以采用截取二进制字符串的形式
        return getUTF8CodePointArr(right, codePointArr);
    } else {
        return codePointArr.map(item=>item.toString(16));
    }
}


/**
 * codePointAt的实现
 * 大于0xFFFF的unicode字符，采用两个utf-16字符表示。
 * 对应的codePointAt(index)也有两个值，分别为0和1，
 * 0返回unicode码点，1返回utf-16的第二个字符（0xDC00-0xDFFF）
 */
if (!String.prototype.codePointAt) {
    (function () {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
        let codePointAt = function (position) {
            if (this == null) {
                throw TypeError();
            }
            let string = String(this);
            let size = string.length;
            // `ToInteger`
            let index = position ? Number(position) : 0;
            if (index != index) { // better `isNaN`
                index = 0;
            }
            // Account for out-of-bounds indices:
            if (index < 0 || index >= size) {
                return undefined;
            }
            // Get the first code unit
            let first = string.charCodeAt(index);
            let second;
            if ( // check if it’s the start of a surrogate pair
            first >= 0xD800 && first <= 0xDBFF && // high surrogate
            size > index + 1 // there is a next code unit
            ) {
                second = string.charCodeAt(index + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
                    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                    // return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
                    return (first - 0xD800) << 10 + second - 0xDC00 + 0x10000;
                }
            }
            return first;
        };
        if (Object.defineProperty) {
            Object.defineProperty(String.prototype, 'codePointAt', {
                'value': codePointAt,
                'configurable': true,
                'writable': true
            });
        } else {
            String.prototype.codePointAt = codePointAt;
        }
    }());
}

/**
 * Unicode字符编码为UTF-16格式
 * @param unicodePoint
 * @returns {*}
 * @constructor
 */
function UnicodeToUTF16(unicodePoint) {
    if (unicodePoint) {
        let unicodeInt = Number.parseInt(unicodePoint, 16);
        if (Number.isInteger(unicodeInt) && unicodeInt >= 0) {
            if (unicodePoint <= 0xFFFF) {
                return unicodePoint;
            } else if (unicodePoint <= 0x10FFFF) { //0x10000----0x10FFFF  need surrogate pair(use two utf-16 chars as one unicode char.)
                let lowSurrogate = 0xD800;
                let highSurrogate = 0xDC00;
                unicodePoint -= 0x10000;  //保证小于等于0xFFFFF，即不超过20二进制位

                let highTen = unicodePoint >> 10;  //unicode字符的高十位
                let lowTen = unicodePoint - (highTen << 10); //unicode字符的低十位
                let utf16FirstCode = (highTen | lowSurrogate); //高10位和lowSurrogate做或(加)运算
                let utf16SecCode = (lowTen | highSurrogate);  //将低10位与highSurrogate做或(加)运算
                // return String.raw `0x${utf16High},0x${_16Low}`;
                return Array.of(utf16FirstCode, utf16SecCode).map(item=>item.toString(16));
            }
        }
    }
    return undefined;
}
