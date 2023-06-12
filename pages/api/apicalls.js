const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateCompletions(prompt, max_tokens) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      max_tokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.log("Error at generateCompletions", error);
  }
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
  const typeOfPrompt = req.query.type;
  const tokenSize = parseInt(req.query.token, 10);

  if (checkURL(nameOrURL)) {
    type = 'articles';
  } else if (type == 'articles') {
    type = 'movies';
  }

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  let prompt = createPrompt(type, nameOrURL, typeOfPrompt);
  // console.log("prompt", prompt);

  try {
    const response = await generateCompletions(prompt, tokenSize);
    const parsedResponse = extractTextAfterNewline(response);
    res.status(200).json({ parsedResponse });
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    res.status(500).json({
      error: {
        message: 'An error occurred during your request.',
      }
    });
  }
}

/*
  - summary = 50 word executive summary
  - review = three takeways (article) in 100 words, write a review of the movie in 100 words with one positive and one negative
  - oneword = quote from the article/book/movie
  - similar = similar article/movie/book
*/

const createPrompt = (type, nameOrURL, typeOfPrompt) => {

  let returnval;

  if (type == 'articles') {
    if (typeOfPrompt == 'summary') {
      returnval = `Write an executive summary of 75 words for the following article: ${nameOrURL}`;
    } else if (typeOfPrompt == 'review') {
      returnval = `Using a numbered list (1, 2, 3), write three takeways in 125 words or less for following article: ${nameOrURL}. Response should be in HTML. Use <ol> to create the list appropriately.`;
    } else if (typeOfPrompt == 'oneword') {
      returnval = `Write the most important quote from the following article: ${nameOrURL}`;
    } else if (typeOfPrompt == 'similar') {
      returnval = `https://www.google.com/search?q=${nameOrURL}`;
    } else if (typeOfPrompt == 'title') {
      returnval = `What is the title or heading of the following article: ${nameOrURL}`;
    }
  } else if (type == 'books') {
    if (typeOfPrompt == 'summary') {
      returnval = `Write an executive summary of 75 words for the following book: ${nameOrURL}. Include the name of the author and main characters (if possible).`;
    } else if (typeOfPrompt == 'review') {
      returnval = `Write a review of the book '${nameOrURL}' in 125 words or less. Include one positive and one negative aspect of the book. Response should be in HTML. Use <p> to create paragraphs appropriately.`;
    } else if (typeOfPrompt == 'oneword') {
      returnval = `Write a famous quote from the following book: ${nameOrURL}`;
    } else if (typeOfPrompt == 'similar') {
      returnval = `Recommend only the name of one book similar to: ${nameOrURL}`;
    }
  } else {
    if (typeOfPrompt == 'summary') {
      returnval = `Write an executive summary of 75 words for the following movie: ${nameOrURL}. Include the main cast and the director.`;
    } else if (typeOfPrompt == 'review') {
      returnval = `Write a review of the movie '${nameOrURL}' in 125 words or less. Include one positive and one negative aspect of the movie. Response should be in HTML. Use <p> to create paragraphs appropriately.`;
    } else if (typeOfPrompt == 'oneword') {
      returnval = `Write a famous quote from the following movie: ${nameOrURL}`;
    } else if (typeOfPrompt == 'similar') {
      returnval = `Recommend only the name and year of release of one movie similar to: ${nameOrURL}`;
    }
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