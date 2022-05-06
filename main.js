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

const body = await fetchHtml('https://en.wikipedia.org/wiki/List_of_presidents_of_the_United_States');
const presidents = parseHtml(body, 'td > b > a[title]');
const vicePresidents = parseHtml(body, 'td[data-sort-value] > a[href]');

let data = [];

    for (let i in presidents) {
        data.push({ name: presidents[i], vice: vicePresidents[i] });
    }

// Debugging
console.log(data);

/* TO DO: 
    Fix authors parsing due to inaccurate parser
    Get to write a JSON file in machine
    Get to write a Google Spreadsheets using API
*/
