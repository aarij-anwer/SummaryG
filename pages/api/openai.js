const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//call openai with a prompt and max_tokens (size)
async function generateCompletions(prompt, max_tokens) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  return completion.data.choices[0].text;
}

//handler for the openai.js
export default async function handler(req, res) {
  const type = req.query.searchType;
  const nameOrURL = req.query.userInput;

  console.log("type", type);
  console.log("nameOrURL", nameOrURL);

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  try {
    //prompt for summary
    let prompt = createPrompt(type, nameOrURL);
    console.log("prompt", prompt);

    const summary = await generateCompletions(prompt.summary, 3000);
    //prompt for review
    const review = await generateCompletions(prompt.review, 3000);
    //prompt for oneword
    const oneword = await generateCompletions(prompt.oneword, 3000);
    //prompt for similar
    const similar = await generateCompletions(prompt.similar, 3000);

    console.log("Summary", summary);
    console.log("Review", review);
    console.log("OneWord", oneword);
    console.log("Similar", similar);
    res.status(200).json({ summary, review, oneword, similar });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
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

  if (type == 'articles')
  {
    returnval.summary = `Write an executive summary of 50 words for the following article: ${nameOrURL}`;
    returnval.review = `Write three takeways in 100 words or less for following article: ${nameOrURL}`;
    returnval.oneword = `Write the most important quote from the following article: ${nameOrURL}`;
    returnval.similar = `Find and share the name and URL of an article related to the following: ${nameOrURL}`;
  } else if (type == 'books') {
    returnval.summary = `Write an executive summary of 50 words for the following book: ${nameOrURL}`;
    returnval.review = `Write a review of the book '${nameOrURL}' in 100 words or less, with at least one positive and one negative.`;
    returnval.oneword = `Write a famous quote from the following book: ${nameOrURL}`;
    returnval.similar = `Find and share the name of a book similar to: ${nameOrURL}`;
  } else {
    returnval.summary = `Write an executive summary of 50 words for the following movie: ${nameOrURL}`;
    returnval.review = `Write a review of the movie '${nameOrURL}' in 100 words or less, with at least one positive and one negative.`;
    returnval.oneword = `Write a famous quote from the following movie: ${nameOrURL}`;
    returnval.similar = `Find and share the name of a movie similar to: ${nameOrURL}`;
  }
  return returnval;
};
