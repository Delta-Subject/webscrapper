import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import fs from 'fs'

const scrape = async (url, parser) => {
  try {
    const output = []
    const $ = cheerio.load(await fetch(url).then((res) => res.text()))
    $(parser).each((i, elem) => (output[i] = $(elem).text()))
    return output
  } catch (error) {
    console.log(error)
  }
}

const data = await scrape('https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States', 'td > b > a[title]').then((res) => res.toString())

fs.writeFile('output.txt', data, (err) => { if (err) { console.err(err) } })

console.log('Succesfully wrote ' + data + ' into output.txt')
// Debugging
// console.log(data)
