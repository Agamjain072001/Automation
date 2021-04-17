let fs = require("fs");

console.log("f1 read sent");
let frp1 = fs.promises.readFile("../f1.txt");
console.log("f2 read sent");
let frp2 = fs.promises.readFile("../f2.txt");
console.log("f3 read sent");
let frp3 = fs.promises.readFile("../f3.txt");

frp1.then(cb);
frp2.then(cb);
frp3.then(cb);

function cb(data){
    console.log("content => " + data);
}