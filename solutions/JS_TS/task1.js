var bitstring = "0110001";
hammingEncode(bitstring);
function hammingEncode(input) {
    var result = "";
    var inputArr = input.split("").map(function (a) { return parseInt(a); });
    var outArr;
    var index = 1;
    inputArr.forEach(function (bit) {
        while (index % 2 != 0) {
            index++;
        }
        outArr[index] = bit;
        index++;
    });
    console.log(outArr);
    return result;
}
