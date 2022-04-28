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
const titles = await scrape('http://libgen.rs/search.php?req=topicid62&open=0&column=topic', 'td a[id]');
const artists = await scrape('http://libgen.rs/search.php?req=topicid62&open=0&column=topic', 'tbody td > a[href^=search]');

const list = [];
for (let title of titles) {
    for (let artist of artists) {
        list.push({ title: title, artist: artist })
    }
}
console.log(list);
