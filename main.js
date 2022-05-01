import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const fetchHtml = async (url) => {
    try {
        return await fetch(url).then(res => res.text())
    } catch (error) {
        console.log(error)
    }
}

const parseHtml = (html, parser) => {
    try {
        const $ = cheerio.load(html)
        const output = [];
        $(parser).each((i, elem) => output[i] = $(elem).text());
        return output;
    } catch (error) {
        console.log(error)
    }
}

const body = await fetchHtml('http://libgen.rs/search.php?&req=topicid62&phrase=1&view=simple&column=topic&sort=def&sortmode=ASC&page=1');
const titles = parseHtml(body, 'tr a[id]');
const authors = parseHtml(body, 'tr td > a[href^=search]');

let data = [];

(() => {
    for (let i in titles) {
        data.push({ title: titles[i], author: authors[i] });
    }
})()

// Debugging
 console.log(data)

/* TO DO: 
    Fix authors parsing due to first entry having a comma
    Get to write a JSON file in machine
    Get to write a Google Spreadsheets using API
*/
