const puppeteer = require("puppeteer");
let links = ["https://www.amazon.in/", "https://www.flipkart.com/", "https://paytmmall.com/"];
let pName = process.argv[2];
let cTab;
(async function fn(){
    try{
        let browserOpenPromise = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let browser = await browserOpenPromise;
        let allTabsArr = await browser.pages();
        cTab = allTabsArr[0];
        let AmazonProductlist = await getProductsFromAmazom(links[0], pName);
        console.log("First five on amazon");
        console.table(AmazonProductlist);
        let AmazonUnsponseredList = await getUnsponseredProductsFromAmazon(links[0], pName);
        console.log("First five unsponsered on amazon");
        console.table(AmazonUnsponseredList);
        let FlipkartProductList = await getProductsFromFlipkart(links[1], pName);
        console.log("First five on Flipkart");
        console.table(FlipkartProductList);
        let FlipkartProductListWithoutAds = await getProductsFromFlipkartWithoutAds(links[1], pName);
        console.log("First five on Flipkart without ads");
        console.table(FlipkartProductListWithoutAds);
        let PaytmMallList = await getProductsFromPaytmMall(links[2], pName);
        console.log("First five on PaytmMall");
        console.table(PaytmMallList);
    }catch(err){
        return new Error(err);
    }
})();

async function getProductsFromFlipkartWithoutAds(link, productName){
    await cTab.goto(link);
    await waitandClick("._3704LK");
    await cTab.type("._3704LK", productName, {delay: 2});
    await cTab.keyboard.press("Enter");
    await cTab.waitForSelector(".s1Q9rs");
    let productListFromFlipkart = await cTab.evaluate(consoleFnWithoutAd, ".s1Q9rs", "._8VNy32 ._25b18c ._30jeq3", "div[style='width: 25%;']", "._4HTuuX");
    return productListFromFlipkart;
}

function consoleFnWithoutAd(selectorName, selectorRate, selectorBlock, selectorAd){
    let allBlocksElem = document.querySelectorAll(selectorBlock);
    let list = [];
    for(let i=0;i<allBlocksElem.length;i++){
        let ifAd = allBlocksElem[i].querySelector(selectorAd);
        if(ifAd == null){
            let pName = allBlocksElem[i].querySelector(selectorName);
            let pRate = allBlocksElem[i].querySelector(selectorRate);
            list.push({
                ProductName: pName.innerText,
                ProductRate: pRate.innerText
            });
        }
        if(list.length == 5){
            return list;
        }
    }
    return list;
}

async function getProductsFromFlipkart(link, productName){
    await cTab.goto(link);
    await waitandClick("._3704LK");
    await cTab.type("._3704LK", productName, {delay: 2});
    await cTab.keyboard.press("Enter");
    await cTab.waitForSelector(".s1Q9rs");
    let productListFromFlipkart = await cTab.evaluate(consoleFn, ".s1Q9rs", "._8VNy32 ._25b18c ._30jeq3");
    return productListFromFlipkart;
}

async function getUnsponseredProductsFromAmazon(link, productName){
    await cTab.goto(link);
    await waitandClick("input[name='field-keywords']");
    await cTab.type("input[name='field-keywords']", productName , { delay: 2 });
    await cTab.click(".nav-search-submit-text.nav-sprite.nav-progressive-attribute");
    await cTab.waitForSelector(".a-size-medium.a-color-base.a-text-normal");
    let UnsponserdProductListFromAmazon = await cTab.evaluate(consoleFnUnsponsered, ".a-size-medium.a-color-base.a-text-normal", ".a-price-whole", ".s-include-content-margin.s-border-bottom.s-latency-cf-section", ".s-label-popover-default .a-color-secondary");
    return UnsponserdProductListFromAmazon;
}

function consoleFnUnsponsered(selectorName, selectorRate, blockSelector, sponseredIdentifier){
    let allBlocks = document.querySelectorAll(blockSelector);
    let list = [];
    for(let i =0; i<allBlocks.length;i++){
        let isSponsered = allBlocks[i].querySelector(sponseredIdentifier);
        if(isSponsered == null){
            let pName = allBlocks[i].querySelector(selectorName);
            let pRate = allBlocks[i].querySelector(selectorRate);
            list.push({
                ProductName: pName.innerText,
                ProductRate: pRate.innerText
            });
        }
        if(list.length == 5){
            return list;
        }
    }
    return list;
}

async function getProductsFromAmazom(link, productName){
    await cTab.goto(link);
    await waitandClick("input[name='field-keywords']");
    await cTab.type("input[name='field-keywords']", productName , { delay: 2 });
    await cTab.click(".nav-search-submit-text.nav-sprite.nav-progressive-attribute");
    await cTab.waitForSelector(".a-size-medium.a-color-base.a-text-normal");
    let productListFromAmazon = await cTab.evaluate(consoleFn, ".a-size-medium.a-color-base.a-text-normal", ".a-price-whole");
    return productListFromAmazon;
}

async function getProductsFromPaytmMall(link, productName){
    await cTab.goto(link);
    await waitandClick("#searchInput");
    await cTab.type("#searchInput", productName, { delay: 2});
    await cTab.keyboard.press("Enter");
    await cTab.keyboard.press("Enter");
    await cTab.waitForSelector(".pCOS ._2PhD .UGUy");
    let productListFromPaytmMall = await cTab.evaluate(consoleFn, ".pCOS ._2PhD .UGUy", ".pCOS ._2bo3 ._1kMS span");
    return productListFromPaytmMall;
}

function consoleFn(selectorName, selectorRate){
    let statsArr = [];
    let productNameElem = document.querySelectorAll(selectorName);
    let productRateElem = document.querySelectorAll(selectorRate);
    for(let i=0;i<5;i++){
        let pName = productNameElem[i].innerText;
        let pRate = productRateElem[i].innerText;
        statsArr.push({
            ProductName: pName,
            ProductRate: pRate
        });
    }
    return statsArr;
}

async function waitandClick(selector){
    await cTab.waitForSelector(selector);
    return await cTab.click(selector);
}