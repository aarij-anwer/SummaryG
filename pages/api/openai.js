const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateCompletions(type, prompt) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Summarize this article:\n\nhttps://www.cbc.ca/news/politics/canada-new-passport-more-nature-fewer-history-1.6838308",
    temperature: 0.7,
    max_tokens: 4000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  // prompt: `For the ${type} ${prompt}, provide a 50 word executive summary.`,
  console.log("completion", completion);
  return completion.data.choices[0].text;
}

export default async function handler(req, res) {
  const { prompt } = req.query;

  // const type = req.body.searchType;
  // const prompt = req.body.userInput;

  // if (!type || !prompt) {
  //   return res.status(400).send('Please provide a prompt');
  // }

  if (!prompt) {
    return res.status(400).send('Please provide a prompt');
  }

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  try {
    // const completions = await generateCompletions(type, prompt);
    const completions = await generateCompletions(prompt);
    console.log(completions);
    res.status(200).json({ completions });
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