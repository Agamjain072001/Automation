let fs =require("fs");
let files =["../f1.txt", "../f2.txt", "../f3.txt", "../f4.txt"];

let frp = fs.promises.readFile(files[0]);
for(let i=1; i<files.length; i++){
    frp = frp.then(function(data){
        console.log("data => " + data);
        return fs.promises.readFile(files[i]);
    })
}
frp.then(function(data){
    console.log("data => " + data);
})