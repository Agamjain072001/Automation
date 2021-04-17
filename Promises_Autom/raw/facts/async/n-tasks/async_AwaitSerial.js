let fs = require("fs");
let files =["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt"];

console.log("Before");

(async function fn(){
    for(let i= 0; i<files.length;i++){
        let content = await fs.promises.readFile(files[i]);
        console.log("content => " + content );
    }
})();

console.log("After");