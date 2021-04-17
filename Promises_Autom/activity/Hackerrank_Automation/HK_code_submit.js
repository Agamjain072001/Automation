// Sbse phle github se jaakr pura code ek baar dekh lena uske baad is line ko hta dena
// Activity ye hai ki hume hackerrank  p ek script k through login krna hai
// Then kisi ek module k saare code submit krne hai isi script k through


// Puppeteer is a framework on which we are working
// It works on chromeum because its open source
const puppeteer = require("puppeteer");
let { answers } = require("./codes");
// Yha se puppeteer launch ho rha hai
// ye puppeteer.launch k andar jp kuch bhi likha hai vo phle ki
// classes m smjhaya gaya tha
let cTab;
let browserOpenPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"]
})
// wecaboy740@bsmitao.com   Ye temporaray mail hai (https://temp-mail.org/en/) Hackerrank m login krne k liye use le rha hu
// Phle is mail se sign up kro or fir use le lo
// Ye promise ka code likha hua hai
// Agar promise succeed hota hai to then function chalta hai
// Sbse phla jitne tabs khule hue hai unhe array m bhar kr return karega
// Dusra then Sbse phle tab m jo link goto m likha hua hai use khol dega
// cTab m tab store hua us tab p goto call krke particular link p gae Then page ko return kr diya
// Apn fir inspect krke input field se slector nikalenge usko type function m likhenge
// Then jo input place m likhna hai vo autmatically script likhegi example email and password
// Page open hone k 200ms baad script email or password likhna chaalu kregi
// Uske baad apan selector ki help se hi login kr rhae hai
browserOpenPromise
    .then(function (browser) {
        let alltabsArrpromise = browser.pages();
        return alltabsArrpromise;
    }).then(function (alltabsArr){
        cTab = alltabsArr[0];
        let visitLoginPagePromise = cTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        return visitLoginPagePromise;
    }).then(function(){
        let emailwillTypedPromise = cTab.type("input[name='username']" , "wecaboy740@bsmitao.com" , { delay: 2 });
        return emailwillTypedPromise;
    }).then(function(){
        let passwordwillTypedPromise = cTab.type("input[name='password']", "Shibbujain2001", { delay: 2 });
        return passwordwillTypedPromise;
    }).then(function(){
        // Ye khudne kiya
        // let clickTheLoginButton = cTab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled'); --> aise bhi kr skte hai
        // Ye sir ne kraya
        let clickTheLoginButton = cTab.click('button[data-analytics="LoginPassword"]')
        return clickTheLoginButton;
    })
    // .then(function(){
    //     // let gotoIPKit = cTab.click('h3[title="Interview Preparation Kit"]');
    //     // Ye error dega kyoki jese hi login p click hoga 
    //     // Vo h3 vala selector dhundega
    //     // But jb apn click krte hai to ek naya page server se aata hai
    //     // Or us page ka dom tree render hone k baad parse hone k baad bnta hai
    //     // Isliye hume is click ko thoda delay krna padega
    //     // Agar apn delay nhi krenge to selector find nhi ho paega
    //     // Isliye hum yha wait for selector use krenge
    //     // Dynamic sites apna selectors hr refresh p change krti hai for example id
    //     // Isliye selector hamesha aisa choose kro jo har refresh p change naa ho
    //     let waitForIpKit = cTab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled', { visible: true});
    //     return waitForIpKit;
    // }).then(function(){
    //     let gotoIPKit = cTab.click('.ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled');
    //     return gotoIPKit;
    // })
    .then(function(){
        return waitandClick('.ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled');
    })
    // .then(function(){
    //     let waitForWarmup = cTab.waitForSelector('a[data-attr1= "warmup"]', { visible: true});
    //     return waitForWarmup;
    // }).then(function(){
    //     let clickOnWarmup = cTab.click('a[data-attr1= "warmup"]');
    //     return clickOnWarmup;
    //     // Ab humko baar baar wait and click krna pd rha hai
    //     // So iske liye hum alag se apna khudka promise function bnaenge
    // })
    .then(function(){
        return waitandClick('a[data-attr1= "warmup"]');
    })
    // Next work is to get the link of all the questions present in page
    // Then pass those link to question solver which solves the question
    .then(function(){
       let waitForQuestions = cTab.waitForSelector('a[data-analytics="ChallengeListChallengeName"]', { visible: true });
       return waitForQuestions;
    })
    .then(function(){
        // Getting links of all the question
        function ConsoleWalaFn(){
            // Selector of any one question is passed to get atttribute all Elem should contain every question with this selector
            //  During finding links for all question must find a selector which is common for all the questions
            let allElem = document.querySelectorAll('a[data-analytics="ChallengeListChallengeName"]');
            // An emoty array is created
            let linksArr = [];
            // Loop through allElem array to get attribute for particular questions
            // It will give us half links so we had tp create the full link ourselves
            for(let i=0; i< allElem.length; i++){
                linksArr.push(allElem[i].getAttribute("href"));
            }
            return linksArr;
        }
        let linksArrPromise = cTab.evaluate(ConsoleWalaFn);
        return linksArrPromise;
    }).then(function(linkArr){
        let questionwillbeSolvePromise = questionSolver(linkArr[0], 0);
        for(let i=1;i<linkArr.length;i++){
            questionwillbeSolvePromise = questionwillbeSolvePromise.then(function(){
                return questionSolver(linkArr[i], i);
            })
        }
        return questionwillbeSolvePromise;
    }).then(function(){
        console.log("Code typed in testcase box succesfully!!");
    }).catch(function(err){
        console.log(err);
    })
    //  Function for both wait and click
function waitandClick(selector){
    return new Promise(function (resolve, reject){
        // Waiting for the selector to come from server
        let elementWaitPromise = cTab.waitForSelector(selector, { visible: true});
        elementWaitPromise.then(function(){
            // Click on the selector
            let elementClickPromise = cTab.click(selector);
            return elementClickPromise;
        }).then(function(){
            resolve();
        }).then(function(err){
            reject(err);
        })
    })
}

function questionSolver(url, idx){
    return new Promise(function(resolve, reject){
        // First work is to go to question page now
        // Apan jb codes vali file m se code bhejenge server p bhejenge then we require a place
        // To paste the code Isliye apn testcase vali jagh usko likh lenege
        // Apn direct editor m isliye nhi likh rhe kyoki vha p automatic generation(open bracket type krne pr automatically close bracket aana) hota hai
        // Isliye testcase vale dabbe m code paste kraenge then ctrl+a or fir ctrl + c krenge or fir editor m code ctrl+a and ctrl + v kr denge
        let fullLink = `https://www.hackerrank.com${url}`;
        let goToQuestionPagePromise = cTab.goto(fullLink);
        goToQuestionPagePromise
        .then(function(){
            // console.log(answers[idx]);
            // Wait for the checkbox to come and when it comes click on it
            return waitandClick('.checkbox-input');
        }).then(function(){
            // Ab checkbox p clixk krne k baad we had to wait for testcase box
            let waitForTestcaseBox = cTab.waitForSelector('.custominput', { visible: true });
            return waitForTestcaseBox;
        }).then(function(){
            // Testcase box aane k baad apn usme code type kr lenge
            let codeWillBeTypedPromise = cTab.type('.custominput', answers[idx], { delay:10 });
            return codeWillBeTypedPromise;
        })
        // Code selct and copy or cut from testcase box
        // To cut the code from testcase box
        .then(function(){
            // This will automatically press the control
            let ctrlwillbepressedpromise = cTab.keyboard.down("Control");
            return ctrlwillbepressedpromise;
        }).then(function(){
            // This will automatically press a to select the code
            let awillbepressed = cTab.keyboard.press("a");
            return awillbepressed;
        }).then(function(){
            // This will automatically press x to cut the code
            let xwillbepressed = cTab.keyboard.press("x");
            return xwillbepressed;
        })
        // Code paste in code editor
        .then(function(){
            // Click on code editor
            let pointerWillbeclicked = cTab.click(".monaco-editor.no-user-select.vs");
            return pointerWillbeclicked;
        }).then(function(){
            // Select all code
            let awillbepressedOnpinter = cTab.keyboard.press("a");
            return awillbepressedOnpinter;
        }).then(function(){
            // Paste the code
            let vwillbepressed = cTab.keyboard.press("v");
            return vwillbepressed;
        }).then(function(){
            // Submit the code
            let submitwillbepressed = cTab.click(".hr-monaco-submit");
            return submitwillbepressed;
        }).then(function(){
            let ctrlwillbepressedpromise = cTab.keyboard.up("Control");
            return ctrlwillbepressedpromise;
        })
        .then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}

    // Reference
    // https://flaviocopes.com/puppeteer/
    