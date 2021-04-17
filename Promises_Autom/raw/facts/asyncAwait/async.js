// This function gives us clear understanding of async keyword
// After applying this keyword function acts like a async function
// when fn is called it prints Hello
// And when readFile is called it continues reading the file
//  In between pending promise is returned 
// So promise <pending> is printed
// And whenever the file reading is completed it calls resolve() in backend
// So then() is called and function written inside then() is having data of the file which is to be read
// That's why data is printed 

let fs = require("fs");
async function fn(){
    console.log("Hello");
    let frp = fs.promises.readFile("../f1.txt");
    return frp;
}
let fnKap = fn();
console.log(fnKap);
fnKap.then(function (data) {
    console.log("data " + data);
})