const fs = require('fs');
const puppeteer = require('puppeteer');
const prettier = require('prettier');

prettier.format('foo ( );', { semi: false, parser: 'babylon' });

async function Main() {
  // Set up browser and page.
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      `--window-size=${1600},${926}`,
    ],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1200, height: 926 });

  //First keyword and array to store;
  let nextPage = 'lolitofdez';
  let arr = [];

  for (
    let i = 0;
    i < 10; /*Esta es una modificacion bien perronga*/
    i++ // <-- You have to to set the arr.length to make it loop infinitely
  ) {
    await page.goto(`https://www.twitch.tv/${nextPage}/following`);
    await page.waitFor(3000); //Wait 3s just for sure

    let rec = await page.$('.tw-strong');
    if (rec) {
      let result = await page.$$('.tw-strong');
      let user = [];
      for (let r of result) {
        arr.push(
          await page.evaluate(e => {
            return {
              username: e.innerText,
            };
          }, r)
        );

        user.push(
          await page.evaluate(e => {
            return {
              username: e.innerText,
            };
          }, r)
        );
      }

      console.log(user);
      // Save extracted items to a file.
      let data = JSON.stringify(arr, null, 2);
      let dato = JSON.stringify(user, null, 2);
      fs.writeFileSync(`./TwitchUsers/Total.json`, data);
      fs.writeFileSync(`./TwitchUsers/${nextPage}.json`, dato);
    }
    nextPage = arr[i].username;
  }
  await browser.close();
}

Main();

