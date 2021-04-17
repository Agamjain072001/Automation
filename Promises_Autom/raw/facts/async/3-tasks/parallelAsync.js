// Firstly Before is printed
// Then fn() is called
// F1 read sent is printed
// Then we get a pending promise in frp1
// F2 read sent is printed
// Then we get another pending promise in frp2
// F3 read sent is printed
// Then we get another pending promise in frp3
// Then we print frp1 frp2 frp3 as promise<pending> promise<pending> promise <pending>
// Then we get await keyword with Promise.all([frp1, frp2, frp3]);
// Promsie.all() function takes array of promises as aa argument and make the function wait until all promises are resolved by stopping the execution
// So function execution stops and we execute the lines written afte the fn() calling
// Sinc every asyn function returns a promise so a pending promise is returned and it is printed
// Then After is printed
// then whenever all promises is resolved we get the data of three files in ans variable in the form of array
// and then ans array is printed
// Since the promises are resolved so then() will be executed but we are not returning anything so ndefined will be returned and printed

let fs = require("fs");
console.log("Before");
async function fn(){
    console.log("F1 read sent");
    let frp1 = fs.promises.readFile("../f1.txt");
    console.log("F2 read sent");
    let frp2 = fs.promises.readFile("../f2.txt");
    console.log("F3 read sent");
    let frp3 = fs.promises.readFile("../f3.txt");
    console.log(frp1, frp2, frp3);
    let ans = await Promise.all([frp1, frp2, frp3]);
    console.log(ans);
    // return "hello"; If this is uncommented then hello will be assingned to ans in then() instead of undefined
}
let fnxp = fn();
console.log(fnxp);
fnxp.then(function(ans){
    console.log(ans);
})
console.log("After");