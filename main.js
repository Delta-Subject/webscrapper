import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const parser = 'td > b > a[title]';

// Functioning

const response = await fetch(url);
const body = await response.text();

const $ = cheerio.load(body);
const output = [];

$(parser).each((i, elem) => output[i] = $(elem).text());

// Debugging

console.log(output);
