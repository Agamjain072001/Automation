let fs = require("fs");
let files =["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt"];

for(let i=0;i<files.length;i++){
    let frp = fs.promises.readFile(files[i]);
    frp.then(cb);
}
function cb(content){
    console.log("content => " + content);
}