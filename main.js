import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const parser = 'td > b > a[title]';

// Functioning

let response, body, $;
const output = [];

try {
    response = await fetch(url);
    body = await response.text();
    $ = cheerio.load(body);
    $(parser).each((i, elem) => output[i] = $(elem).text());
} catch (error) {
    console.log(error);
}


// Debugging

console.log(output);
