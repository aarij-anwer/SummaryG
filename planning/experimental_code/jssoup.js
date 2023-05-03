const JSSoup = require('jssoup').default;
const https = require('https');

function getHtmlFromUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let html = '';

      res.on('data', (chunk) => {
        html += chunk;
      });

      res.on('end', () => {
        resolve(html);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

getHtmlFromUrl('https://www.example.com')
  .then((html) => {
    console.log(html);
    // const soup = new JSSoup(html, false);
    // let tag = soup.find('head');
    // console.log(tag);
  })
  .catch((err) => {
    console.error(err);
  });
