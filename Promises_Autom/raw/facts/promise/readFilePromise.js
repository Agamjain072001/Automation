// Fact no-> 1
// let fs = require("fs");
// console.log("Before");
// let frp = fs.promises.readFile("f1.txt");
// console.log(frp);
// setTimeout(function()  {
//     console.log(frp);   //Buffer
// }, 1000);
// console.log("after");






// Fact no -> 2
// let fs = require("fs");
// console.log("Before");

// // promise represent future
// function MyFileReadPromise(filePath){
    // The function written inside brackets of new Promise is called just because of constructor defined in Promise class
    // In that constructor Promise calls function which is passed inside it in arguments
//     return new Promise(function(resolve, reject){
//         console.log("Hello");
//         fs.readFile(filePath, function cb(err, data){
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(data);
//             }
//         })
//         console.log("Hello after");
//     })
// }
// let frp = MyFileReadPromise("f1.txt");
// console.log(frp);
// setTimeout(function()  {
//     console.log(frp);   //Buffer
// }, 1000);
// console.log("after");


// Another way of doing fact-no-2
// let fs = require("fs");
// console.log("2","Before");

// // promise represent future
// function MyFileReadPromise(filePath){
//     return new Promise(cb);
//     function cb(resolve, reject){
//         console.log("8","Hello");
//         fs.readFile(filePath, function cb(err, data){
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(data);
//             }
//         })
//         console.log("15","Hello after");
//     }
// }
// let frp = MyFileReadPromise("f1.txt");
// console.log("20",frp);
// setTimeout(function()  {
//     console.log("22",frp);   //Buffer
// }, 1000);
// console.log("24","after");





// Fact no - 3
// let fs = require("fs");
// console.log("2 Before");

// // promise represent future
// function MyFileReadPromise(filePath){
//     return new Promise(function(resolve, reject){
//         console.log("8 Hello");
//         fs.readFile(filePath, function cb(err, data){
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(data);
//             }
//         })
//         console.log("15 Hello after");
//     })
// }
// console.log("20");
// let frp = MyFileReadPromise("f1.txt");
// console.log("22",frp);
// console.log("26");
// frp.then(scp);
// function scp(data){
//     console.log("28 in then", data);
// }
// console.log("30");
// frp.catch(hcb);
// function hcb(err){
//     console.log("32 in catch", err);
// }
// console.log("34 after");


// fact no-4
// let fs = require("fs");
// console.log("2 Before");

// // promise represent future
// function MyFileReadPromise(filePath){
//     return new Promise(function(resolve, reject){
//         console.log("8 Hello");
//         fs.readFile(filePath, function cb(err, data){
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(10);    //Only this will be executed
//                 resolve(data);
//             }
//         })
//         console.log("15 Hello after");
//     })
// }
// console.log("20");
// let frp = MyFileReadPromise("f1.txt");
// console.log("22",frp);
// console.log("26");
// frp.then(scp);
// function scp(data){
//     console.log("28 in then", data);
// }
// console.log("30");
// frp.catch(hcb);
// function hcb(err){
//     console.log("32 in catch", err);
// }
// console.log("34 after");


// fact no :-  5
let fs = require("fs");

// promise represent future
function MyFileReadPromise(filePath){
    return new Promise(function(resolve, reject){
        fs.readFile(filePath, function cb(err, data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
console.log("Before");
let frp = MyFileReadPromise("f1.txt");
console.log("frp", frp);
let thenkapromise = frp.then(function(data){
    console.log(data);
    // return 10;       If return is not available then value returned is undefined
})
console.log("then ka promise", thenkapromise);
setTimeout(function() {
    console.log("frp", frp);
    console.log("thenkapromise", thenkapromise);
}, 1000);
console.log("After");