let fs = require("fs");
// fs.readFile("f1.txt", function cb(err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("data->" + data);
//     }
// })
console.log("before");
 // file read promise
let frp = fs.promises.readFile("f1.txt");
// // then function -> fullfill 
// then -> to consume promise
// callback control control
// If the work is fullfilled then is called otherwise catch is called
frp
.then(function (content) {
        console.log("content->" + content);
    })
frp.catch(function (err) {
        console.log("err", err);
    })

console.log("After");


// Async await functions 
// Another way to represent then ad catch
// 
(async function fn(){
    try{
        let content = await = fs.promises.readFile("f1.txt");
        console.log("content => "+ content);
    }catch(err){
        console.log(err);
    }
})();