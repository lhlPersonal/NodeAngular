/**
 * Created by bulusli on 2016/6/15.
 */

{
    let buff = new ArrayBuffer(32);
    let x1 = new Int32Array(buff, 0, 2);  //
    let x2 = new Int16Array(buff, 0, 2);  //用两个16进制数字覆盖x1的第一个4字节整数。

    x1[0] = 0x211234;
    //x1[0]存储为4字节，即0x00,0x21,0x12，0x34。按照小字节序的方式存储（little-endian低地址存储低位字节），存储地址由低到高，顺序为0x34,0x12,0x21,0x00
    //，输出时，需要注意按照小字节序的顺序。如16进制数组的第一个数字的两个字节为0x34,0x12，则该数字输出为0x12 0x34，因为低地址对应的值对应数字的低位。
    console.log(x2[0].toString(16), x2[1]);

    let x3 = new Uint32Array(buff, 12, 1);
    let x4 = new Uint16Array(buff, 12);  //覆盖x3的4个字节
    let x5 = new Uint8Array(buff, 14, 2); //覆盖x3的后两个字节

    //0x 00 01 42 08
    x3[0] = 0x00014208;//存储为buff[12]=0x08,buff[13]=0x42;buff[14]=0x01,buff[15]=0;
    x5[0] = 0x12;  //buff[14]=0x12;
    x5[1] = 0x34;//buff[15]=0x34;

    //x4[0]:buff[12],buff[13],x4[1]:buff[14],buff[15]
    //输出x4[0]:0x4208,x4[1]:1;
    console.log(x4[0].toString(16), x4[1].toString(16), x4[2].toString(16));

}

const LITTLE_ENDIAN = Symbol("LITTLE-ENDIAN");
const BIG_ENDIAN = Symbol("BIG-ENDIAN");

console.log(getCurrEndianness);

/**
 * 获取当前系统的Endianness
 *
 * 变量前如果换成let则会报错，var时由于变量提升到顶部，上面的log方法会输出undefined，
 * 如果改成function getCurrEndianness(){}的方式则函数会提升到顶部，log正常执行
 */
var getCurrEndianness = function () {
    let arr32 = Uint32Array.of(0x12345678);
    let arr8 = new Uint8Array(arr32.buffer);
    let total = (arr8[0] << 24) + (arr8[1] << 16) + (arr8[2] << 8) + arr8[3];

    if (Object.is(total, 0x78563412)) {
        return LITTLE_ENDIAN;
    } else if (Object.is(total, 0x12345678)) {
        return BIG_ENDIAN;
    } else {
        throw new Error("Unknown endianness!!!!!")
    }
};

/**
 * 字符串转ArrayBuffer
 * @param str
 * @returns {ArrayBuffer}
 */
function stringToBuffer(str) {
    if (str && Object.is(typeof str, "string")) {
        let charBuffer = new ArrayBuffer(str.length * 2); //utf-16
        let utf16Arr = new Uint16Array(charBuffer);

        for (let i = 0; i < utf16Arr.length; i++) {
            utf16Arr[i] = str.charCodeAt(i);
        }
        return charBuffer;
    }
    return undefined;
}

console.log(stringToBuffer('\u{20bb7}'));

