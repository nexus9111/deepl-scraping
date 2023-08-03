const { translate } = require("./lib/scraper");

const SENTENCE = "Hello Friend";
const FROM_LANGUAGE = "en";
const TO_LANGUAGE = "fr";

translate({ sentence: SENTENCE, fromLanguage: FROM_LANGUAGE, toLanguage: TO_LANGUAGE }).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});