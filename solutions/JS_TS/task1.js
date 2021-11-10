const bitstring = "0110001";
const bitstringToDecode = "00011110000";
function hammingEncode_7_4(inp) {
    const arr = inp.split("").map(str => parseInt(str));
    const outArr = [];
    const parityPos = [];
    // calc bit positions
    const highestExponent = Math.ceil(Math.log2(inp.length));
    for (let i = 0; i <= highestExponent; i++) {
        parityPos.push(2 ** i);
    }
    // fill other positions
    let lastWrittenPos = 0;
    for (let i = 0; i < 11; i++) {
        if (!(parityPos.includes(i + 1))) {
            outArr[i] = arr[lastWrittenPos];
            // update parity bits
            parityPos.forEach(pos => {
                var _a;
                // check if bit is resposible for current bit 
                if (((i + 1) & (pos)) > 0) {
                    outArr[pos - 1] = (((_a = outArr[pos - 1]) !== null && _a !== void 0 ? _a : 0) + arr[lastWrittenPos]) % 2;
                }
            });
            lastWrittenPos++;
        }
    }
    return outArr.join("");
}
function hammingDecode_7_4(inp) {
    var _a;
    let arr = inp.split("").map(str => parseInt(str));
    const parityPos = [];
    const parityBits = [];
    // calc bit positions
    const highestExponent = Math.floor(Math.log2(inp.length));
    for (let i = 0; i <= highestExponent; i++) {
        parityPos.push(2 ** i);
    }
    // fill other positions
    for (let i = 0; i < inp.length; i++) {
        // update parity bits
        for (let index = 0; index < parityPos.length; index++) {
            let pos = parityPos[index];
            // check if bit is resposible for current bit 
            // ex parity bit 4: 0100 
            //               5: 0101
            //            (4+1) & 5 = 0101 > 0
            // if parity bit is responsible for current bit, (parityBit + 1) & (parityValue) > 0
            if (((i + 1) & (pos)) > 0) {
                parityBits[index] = (((_a = parityBits[index]) !== null && _a !== void 0 ? _a : 0) + arr[i]) % 2;
            }
        }
    }
    // calculate wrong bit
    const wrongPosition = parityBits.reduce((a, b, index) => {
        return a + b * Math.pow(2, index);
    });
    // correct wrong bit
    if (wrongPosition) {
        arr[wrongPosition - 1] = Math.abs(arr[wrongPosition - 1] - 1);
    }
    // get data bits
    arr = arr.filter((val, ind) => {
        return !parityPos.includes(ind + 1);
    });
    return arr.join("");
}
console.info("\t --ENCODING--");
console.log("bitstring : '" + bitstring + "'");
console.log("hamming encoded bits: '" + hammingEncode_7_4(bitstring) + "'");
console.info("\t --DECODING--");
console.log("hamming encoded bits: '" + bitstringToDecode + "'");
console.log("hamming decoded bits: '" + hammingDecode_7_4(bitstringToDecode) + "'");
