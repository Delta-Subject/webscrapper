import fetch from 'node-fetch';
import * as cheerio from 'cheerio';


const scrape = async (url, parser) => {
    try {
        const output = []
        const $ = cheerio.load(await fetch(url).then((res) => res.text()));
        $(parser).each((i, elem) => output[i] = $(elem).text());
        return output;
    } catch (error) {
        console.log(error)
    }
}


// Debugging

console.log(await scrape('https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States', 'td > b > a[title]'))
