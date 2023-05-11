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
    let prompt = createSummaryPrompt(type, nameOrURL);
    console.log("prompt", prompt);

    const summary = await generateCompletions(prompt, 3000);
    //prompt for review
    //prompt for oneword
    //prompt for similar

    console.log("Summary", summary);
    res.status(200).json({ summary });
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

const createSummaryPrompt = (type, nameOrURL) => {
  //singularize the type
  const singularizedType = singularizeType(type);
  let answer = "";

  if (singularizedType == 'article')
  {
    answer = `Write an executive summary of 50 words for the following article: ${nameOrURL}`;
  } else if (singularizedType == 'book') {
    answer = `Write an executive summary of 50 words for the following book: ${nameOrURL}`;
  } else {
    answer = `Write an executive summary of 50 words for the following movie: ${nameOrURL}`;
  }

  return answer;
};

const singularizeType = (type) => {
  return type.substring(0,type.length-1);
};