var bitstring = "0110001";
var bitstringToDecode = "00011110000";
function hammingEncode_7_4(inp) {
    var arr = inp.split("").map(function (str) { return parseInt(str); });
    var outArr = [];
    var parityPos = [];
    // calc bit positions
    var highestExponent = Math.ceil(Math.log2(inp.length));
    for (var i = 0; i <= highestExponent; i++) {
        parityPos.push(Math.pow(2, i));
    }
    // fill other positions
    var lastWrittenPos = 0;
    var _loop_1 = function (i) {
        if (!(parityPos.includes(i + 1))) {
            outArr[i] = arr[lastWrittenPos];
            // update parity bits
            parityPos.forEach(function (pos) {
                var _a;
                if (((i + 1) & (pos)) > 0) {
                    outArr[pos - 1] = (((_a = outArr[pos - 1]) !== null && _a !== void 0 ? _a : 0) + arr[lastWrittenPos]) % 2;
                }
            });
            lastWrittenPos++;
        }
    };
    for (var i = 0; i < 11; i++) {
        _loop_1(i);
    }
    return outArr.join("");
}
function hammingDecode_7_4(inp) {
    var _a;
    var arr = inp.split("").map(function (str) { return parseInt(str); });
    var parityPos = [];
    var parityBits = [];
    // calc bit positions
    var highestExponent = Math.ceil(Math.log2(inp.length));
    for (var i = 0; i <= highestExponent; i++) {
        parityPos.push(Math.pow(2, i));
    }
    // fill other positions
    for (var i = 0; i < inp.length; i++) {
        // update parity bits
        for (var index = 0; index < parityPos.length; index++) {
            var pos = parityPos[index];
            if (((i + 1) & (pos)) > 0) {
                parityBits[index] = (((_a = parityBits[index]) !== null && _a !== void 0 ? _a : 0) + arr[i]) % 2;
            }
        }
    }
    // calculate wrong bit
    var wrongPosition = parityBits.reduce(function (a, b, index) {
        return a + b * Math.pow(2, index);
    });
    // correct wrong bit
    if (wrongPosition) {
        arr[wrongPosition - 1] = Math.abs(arr[wrongPosition - 1] - 1);
    }
    console.log(wrongPosition);
    return arr.join("");
}
console.log(hammingDecode_7_4(bitstringToDecode));
// console.log("bitstring : '" + bitstring + "'");
// console.log("hamming encoded code: '" + hammingEncode_7_4(bitstring) + "'");
