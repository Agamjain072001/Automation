// promise -> return promise
// Js -> browser control 
//  Promise -> promise 
// Functions of puppeteer gives promises on which we call then and catch

// Requiring puppeteer
const puppeteer = require("puppeteer");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/ball-by-ball-commentary";
let gPage;
// This function will give launch browser promise
let browseropenP = puppeteer.launch({
    headless: false,    //If this is true then browser is not shown or if headless is not present here then alsp browser is nt shown
    defaultViewport: null,      //This will open page in browser to a default viewport and we can also give width, height, etc to open page innthe for of particular viewport
    args: ["--start-maximized", "--incognito"]      
    //  --start-maximized -> open browset in maximized form
    //  --incognito -> open browser in incognito mode
})
// full fill -> then -> 
// This will give promise to close browser
// let browserclosepromise =browser.close();
// browserclosepromise
// .then(
//     function () {
//     console.log("Browser closed");
// })
// This is chaining of then which is good practice
browseropenP
    .then(function (browser) {
        // This will give promise to close browser
        // This is nesting of then which is not good practice
        // let browserclosepromise =browser.close();
        // browserclosepromise
        // .then(
        //     function () {
        //     console.log("Browser closed");
        // })
        console.log("browser opened");
        // This will give all tabs already opened in in browser
        let alltabsPromise = browser.pages();
        // Returnning promise
        return alltabsPromise;
    })
    .then(function (tabs) {
        // In tabs we got returned value of upper then
        // Then on 0th tabs we can goto another url using goto
        gPage = tabs[0];
        let cricinfoPromise = gPage.goto(url);
        return cricinfoPromise;
    })
    .then(function () {
        function fn() {
            // first entry 
            // innerText
            // value
            console.log("hello");
            // To understand document check index.html in dom folder
            return document.querySelector(".best-player-name").innerText;
        }
        // If we want to evaluate a function and get a value from that function then we use evaluate
        // the function passed inside evaluate() will be executed in browser console
        let Playernamepromise = gPage.evaluate(fn);
        return Playernamepromise;
    }).then(function (playerName) {
        console.log(playerName);
    })