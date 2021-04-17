// This function gives us understanding regarding the await keyword used instead of promises
// await keyword is used to make the syntax easier 
// In this code firstly before is printed
// Then, function fn() is called so 10 Hello is printed
// And then an async function readFile is called which reads the data of file
// so until the data is read another lines of function should be executed
// But in next line await frp is written so it stops the execution of function until the data of file is readed completely.
// So function execution is stopped and the next line after function calling is executed
// Since the fn() execution is stopped so a pending promise will be returned
// So it prints Promise<Pending>
// And then After is printed
// Then whenever promise is resolved and await returns data another lines of function will be executed
// Since data variable has data of whole file so it prints 12Hi I am F1.
// And then 10 is returned
// So now the promise is resolved so then() function will be called and 10 is returned 
// so it prints 19 data 10


// 1. await will only valid in async function
//  2. await suspends the execution of currently eexecuting async funxtion
//  3. async function returns a promise thet will be resolved when whle async function is executed

let fs = require("fs");
console.log("Before");
async function fn(){
    console.log("10 Hello");
    let frp = fs.promises.readFile("../f1.txt");
    let data = await frp;
    console.log("12" + data);
    return 10;
}
let fnKap = fn();
console.log(fnKap);

fnKap.then(function(data){
    console.log("19 data" + data);
})
console.log("After");