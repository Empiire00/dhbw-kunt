const bitstring: string = "0110001";
const bitstringToDecode: string = "00011110000";

function hammingEncode_7_4(inp: string): string {
    const arr: number[] = inp.split("").map(str => parseInt(str));
    const outArr: number[] = [];
    const parityPos: number[] = [];

    // calc bit positions
    const highestExponent: number = Math.ceil(Math.log2(inp.length));
    for (let i: number = 0; i <= highestExponent; i++) {
        parityPos.push(2 ** i);
    }

    // fill other positions
    let lastWrittenPos: number = 0;
    for (let i: number = 0; i < 11; i++) {
        if (!(parityPos.includes(i + 1))) {
            outArr[i] = arr[lastWrittenPos];
            // update parity bits
            parityPos.forEach(pos => {
                // check if bit is resposible for current bit 
                if (((i + 1) & (pos)) > 0) {
                    outArr[pos - 1] = ((outArr[pos - 1] ?? 0) + arr[lastWrittenPos]) % 2;
                }
            })
            lastWrittenPos++;
        }
    }
    return outArr.join("");
}
function hammingDecode_7_4(inp: string): string {
    let arr: number[] = inp.split("").map(str => parseInt(str));
    const parityPos: number[] = [];
    const parityBits: number[] = [];
    
    // calc bit positions
    const highestExponent: number = Math.ceil(Math.log2(inp.length));
    for (let i: number = 0; i <= highestExponent; i++) {
        parityPos.push(2 ** i);
    }
    
    // fill other positions
    for (let i: number = 0; i < inp.length; i++) {
        // update parity bits
        for (let index: number = 0; index < parityPos.length; index++) {
            let pos = parityPos[index];
            // check if bit is resposible for current bit 
            if (((i + 1) & (pos)) > 0) {
                parityBits[index] = ((parityBits[index] ?? 0) + arr[i]) % 2;
            }
        }
    }
    // calculate wrong bit
    const wrongPosition = parityBits.reduce((a, b, index) => {
        return a + b * Math.pow(2, index);
    })
    // correct wrong bit
    if (wrongPosition) {
        arr[wrongPosition - 1] = Math.abs(arr[wrongPosition - 1] - 1);
    }
    // get data bits
    arr = arr.filter((val, ind)=>{
        return !parityPos.includes(ind + 1)
    })
    return arr.join("");
}
console.info("\t --ENCODING--");
console.log("bitstring : '" + bitstring + "'");
console.log("hamming encoded bits: '" + hammingEncode_7_4(bitstring) + "'");
console.info("\t --DECODING--");
console.log("hamming encoded bits: '" + bitstringToDecode + "'");
console.log("hamming decoded bits: '" + hammingDecode_7_4(bitstringToDecode) + "'");