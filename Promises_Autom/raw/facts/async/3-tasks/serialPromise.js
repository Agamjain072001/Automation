// This is how we can acces files serially using promises
// But this is not a good practice to execute promises
// because in this we had to call catch for every then seperately
// let fs = require("fs");
// let frp1 = fs.promises.readFile("../f1.txt");
// frp1.then(cb1);
// frp1.catch(fcb);
// function cb1(content){
//     console.log("content => " + content);
//     console.log("f2 read sent");
//     let frp2 = fs.promises.readFile("../f2.txt");
//     frp2.then(cb2);
//     frp2.catch(fcb);
// }
// function cb2(content){
//     console.log("content => " + content);
//     console.log("f3 read sent");
//     let frp3 = fs.promises.readFile("../f3.txt");
//     frp3.then(cb3);
//     frp3.catch(fcb);
// }
// function cb3(content){
//     console.log("content => " + content);
//     console.log("All tasks completed");
// }
// function fcb(err){
//     console.log("catched error");
// }


// This is a good practice to do chaining of then() functions
// because in this we had to call catch only one time for every then()
let fs = require("fs");
let frp1 = fs.promises.readFile("../f1.txt");
frp1.then(cb1).then(cb2).then(cb3).catch(fcb);
// This can also be written like this to understand tracing
// let fthenkapromise = frp.then(cb1);
// let sthenkapromise = ftenkapromise.then(cb2);
// sthenkapromise.then(cb3);
function cb1(content){
    console.log("content => " + content);
    console.log("f2 read sent");
    let frp2 = fs.promises.readFile("../f2.txt");
    return frp2;
}
function cb2(content){
    console.log("content => " + content);
    console.log("f3 read sent");
    let frp3 = fs.promises.readFile("../f3.txt");
    return frp3;
}
function cb3(content){
    console.log("content => " + content);
    console.log("All tasks completed");
}
function fcb(err){
    console.log("catched error",err);
}