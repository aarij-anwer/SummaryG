// const axios = require('axios');

// const encodedParams = new URLSearchParams();
// encodedParams.set('url', 'chomsky.info/articles/20131105.htm');
// encodedParams.set('inputhtml', '<html><head><title>Example</title><body><article itemprop="articleBody"><p>Test</p></article></body></html>');
// encodedParams.set('xss', '1');
// encodedParams.set('lang', '2');
// encodedParams.set('links', 'remove');
// encodedParams.set('content', '1');

// const options = {
//   method: 'POST',
//   url: 'https://www.example.com',
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded',
//     'X-RapidAPI-Key': '1bad9803bemsha73f88ab2443c93p118949jsnc0dc5f822dd3',
//     'X-RapidAPI-Host': 'full-text-rss.p.rapidapi.com'
//   },
//   data: encodedParams,
// };

// // try {
// // 	const response = axios.request(options);
// // 	console.log(response.data);
// // } catch (error) {
// // 	console.error(error);
// // }

// axios.request(options)
//   .then((res) => {
//     console.log(res.data);
//   });

const qs = require('querystring');
const http = require('https');

const options = {
	method: 'POST',
	hostname: 'full-text-rss.p.rapidapi.com',
	port: null,
	path: '/extract.php',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '1bad9803bemsha73f88ab2443c93p118949jsnc0dc5f822dd3',
		'X-RapidAPI-Host': 'full-text-rss.p.rapidapi.com'
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.write(qs.stringify({
  url: 'chomsky.info/articles/20131105.htm',
  xss: '1',
  lang: '2',
  links: 'remove',
  content: '1'
}));
req.end();