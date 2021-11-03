const bitstring: string = "0110001"

function hammingEncode_7_4(inp: string): string {
    const arr: number[] = inp.split("").map(str => parseInt(str));
    const outArr: number[] = [];
    const parityPos: number[] = []

    // calc bit positions
    const highestExponent: number = Math.ceil(Math.log2(inp.length));
    for (let i: number = 0; i <= highestExponent; i++) {
        parityPos.push(2 ** i)
    }

    // fill other positions
    let lastWrittenPos: number = 0;
    for (let i: number = 0; i < 11; i++) {
        if (!(parityPos.includes(i + 1))) {
            outArr[i] = arr[lastWrittenPos];
            // update parity bits
            parityPos.forEach(pos => {
                if (((i +1 ) & (pos)) > 0) {
                    outArr[pos -1 ] = ((outArr[pos -1] ?? 0) + arr[lastWrittenPos]) % 2
                }
            })
            lastWrittenPos++;
        }
    }
    return outArr.join("");
}
console.log("bitstring : '" + bitstring + "'");
console.log("hamming encoded code: '" + hammingEncode_7_4(bitstring) + "'");