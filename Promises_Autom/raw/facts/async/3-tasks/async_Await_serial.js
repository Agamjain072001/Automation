// async await is nothing but a syntax sugar which means that
// It is a easier way of writing then function
// We can also say that it is altrnative of then

// Requiring fs module
let fs =require("fs");

// Taking promise from f1.txt

console.log("Before");

async function fn(){
    let frp = fs.promises.readFile("../f1.txt");
    let content = await frp;
    console.log("content => " + content);
    frp = fs.promises.readFile("../f2.txt");
    content = await frp;
    console.log("content => " + content);
    frp = fs.promises.readFile("../f3.txt");
    content = await frp;
    console.log("content => " + content);
    frp = fs.promises.readFile("../f4.txt");
    content = await frp;
    console.log("content => " + content);
    console.log("All tasks are completed");
    return "Everything will work fine";
}
let fnrp = fn();
fnrp.then(function(data){
    console.log("inside then " + data );
})

console.log("After");

// Theory at 25 January