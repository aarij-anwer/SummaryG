const { Configuration, OpenAIApi } = require("openai");
import { PrismaClient } from '@prisma/client';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const prisma = new PrismaClient();
let sID;
let rID;

function generateCompletions(prompt, max_tokens) {
  return openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })
    .then((response) => {
      return response.data.choices[0].text;
    })
    .catch((error) => {
      console.log(error);
    })
}


async function addSearchToDB(type, searchTerm, sessionID) {
  // console.log("searchTerm", searchTerm);
  const search = await prisma.Search.create({
    data: {
      type,
      searchTerm,
      sessionID
    },
  });
  return search;
}

async function addResultsToDB(searchID, summary, review, oneWordReview, similar) {
  const result = await prisma.Result.create({
    data: {
      searchID,
      summary,
      review,
      oneWordReview,
      similar
    },
  });

  sID = result.searchID;
  rID = result.id;

  return result;
}

// Function to extract text after "\n\n"
function extractTextAfterNewline(text) {
  const index = text.indexOf('\n\n');
  return text.substring(index + 2);
}

//handler for the openai.js
export default async function handler(req, res) {

  let type = req.query.searchType;
  let nameOrURL = req.query.userInput;
  const sessionID = req.query.sessionID;

  if (checkURL(nameOrURL)) {
    type = 'articles';
  }

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  let prompt = createPrompt(type, nameOrURL);
  console.log("prompt", prompt);

  //prompt for summary
  const summaryResponse = generateCompletions(prompt.summary, 3000);
  // console.log(summaryResponse);

  //prompt for review
  const reviewResponse = generateCompletions(prompt.review, 3000);
  // console.log(reviewResponse);

  //prompt for oneword
  const onewordResponse = generateCompletions(prompt.oneword, 3000);
  
  const promises = [summaryResponse, reviewResponse, onewordResponse];

  // prompt for a title if a URL
  if (type == 'articles') {
    const name = generateCompletions(prompt.title, 3000);
    promises.push(name);
  } else {
    //otherwise, prompt for similar content
    const similarResponse = generateCompletions(prompt.similar, 3000);
    promises.push(similarResponse);
  }

  Promise.all(promises)
    .then(async (all) => {
      // console.log("openAICopy", all);
      const summary = extractTextAfterNewline(all[0]);
      const review = extractTextAfterNewline(all[1]);
      const oneword = extractTextAfterNewline(all[2]);
      let similar;
      if (type == 'articles') {
        nameOrURL = extractTextAfterNewline(all[3]);
        similar = `https://www.google.com/search?q=${nameOrURL}`;
      } else {
        similar = extractTextAfterNewline(all[3]);
      }
      const searchID = await addSearchToDB(type, nameOrURL, sessionID);
      const resultID = await addResultsToDB(searchID.id, summary, review, oneword, similar);
      console.log("searchID", searchID);
      res.status(200).json({ summary, review, oneword, similar, sID, rID });
    })
    .catch((error) => {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      })
    })
}

/*
  - summary = 50 word executive summary
  - review = three takeways (article) in 100 words, write a review of the movie in 100 words with one positive and one negative
  - oneword = quote from the article/book/movie
  - similar = similar article/movie/book
*/

const createPrompt = (type, nameOrURL) => {
  //singularize the type
  // const singularizedType = singularizeType(type);
  let returnval = {};

  if (type == 'articles') {
    returnval.summary = `Write an executive summary of 75 words for the following article: ${nameOrURL}`;
    returnval.review = `Using a numbered list (1, 2, 3), write three takeways in 150 words or less for following article: ${nameOrURL}`;
    returnval.oneword = `Write the most important quote from the following article: ${nameOrURL}`;
    returnval.similar = `Recommend only the name and URL for an article that is similar to the following article: ${nameOrURL}`;
    returnval.title = `What is the title or heading of the following article: ${nameOrURL}`;
  } else if (type == 'books') {
    returnval.summary = `Write an executive summary of 75 words for the following book: ${nameOrURL}`;
    returnval.review = `Write a review of the book '${nameOrURL}' in 150 words or less. Include one positive and one negative aspect of the book.`;
    returnval.oneword = `Write a famous quote from the following book: ${nameOrURL}`;
    returnval.similar = `Recommend only the name of one book similar to: ${nameOrURL}`;
  } else {
    returnval.summary = `Write an executive summary of 75 words for the following movie: ${nameOrURL}`;
    returnval.review = `Write a review of the movie '${nameOrURL}' in 150 words or less. Include one positive and one negative aspect of the movie.`;
    returnval.oneword = `Write a famous quote from the following movie: ${nameOrURL}`;
    returnval.similar = `Recommend only the name and year of release of one movie similar to: ${nameOrURL}`;
  }
  return returnval;
};

const checkURL = (variable) => {
  let answer = false;
  if (variable.startsWith('http://') || variable.startsWith('https://') || variable.startsWith('www.') || variable.startsWith('http://www.') || variable.startsWith('https://www.')) {
    answer = true;
  }

  return answer;
};