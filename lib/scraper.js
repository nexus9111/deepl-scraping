const BrowserPage = require("./browser");
const cheerio = require("cheerio");

exports.translate = async ({ sentence, fromLanguage, toLanguage }) => {
    let page = new BrowserPage();
    let content = await page.getContent(new URL(`https://www.deepl.com/translator#${fromLanguage}/${toLanguage}/${sentence}`), {});

    const $ = cheerio.load(content);
    let extractedContent = $("[aria-labelledby='translation-results-heading'] p").text();

    BrowserPage.closeBrowser();
    return extractedContent;
}