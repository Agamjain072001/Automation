let fs = require("fs");
console.log("Before");
// promise based creator
// resolve and reject are default functions
// we can change the name of resolve and reject
// but first is always for then and second is always for catch
function MyFileReadPromise(filePath) {
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

// Agar error dekhni ho to aisi file ka path do jo ki exist hi nhi krta
let frp = MyFileReadPromise("f1.txt");
console.log(frp);
frp.then(function(data){
    // Agar buffer k form m dekhna hai to
    // console.log("data -> ", data);
    // Agar simply dekhna hai to
    console.log("data -> ", data + "");
})
frp.catch(function(err){
    console.log(err);
})
console.log("After");

// Alternate way
// let f1read = fs.promises.readFile("f1.txt");
// console.log(f1read);
// f1read.then(function(data){
//     console.log("data -> ", data + "");
// })
// f1read.catch(function(err){
//     console.log(err);
// })
// console.log("After");