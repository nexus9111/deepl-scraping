let puppeteer = require('puppeteer-extra');
let StealthPlugin = require('puppeteer-extra-plugin-stealth');
const {executablePath} = require('puppeteer') 
puppeteer.use(StealthPlugin());

// show browser
let browser = puppeteer.launch({ headless: "new", executablePath: executablePath()  });

//-----------------------------------------------------------------------------

function BrowserPage() {
    this.browser = null;
    this.page = null;

    this.init();
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.init = function () {
    this.browser = browser;
    this.page = this.createNewBrowserPage();
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.createNewBrowserPage = function () {
    return this.browser.then(browser => browser.newPage());
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.navigate = function (url, params = {}) {
    return this.page.then((page) => {
        return page.goto(BrowserPage.buildURL(url, params), { waitUntil: 'networkidle0' }).then(() => page);
    });
}

//-----------------------------------------------------------------------------

BrowserPage.prototype.getContent = function (url, params) {
    return this.navigate(url, params).then((page) => {
        return page.$eval('body', el => el.innerHTML).then((html) => {
            return html;
        })
    });
}

//-----------------------------------------------------------------------------

BrowserPage.closeBrowser = function () {
    return browser.then((browser) => browser.close());
}

//-----------------------------------------------------------------------------

BrowserPage.buildURL = function (url, params = {}) {
    Object.getOwnPropertyNames(params).forEach((key) => url.searchParams.append(key, params[key]));
    return url.href;
}

//-----------------------------------------------------------------------------

module.exports = BrowserPage;