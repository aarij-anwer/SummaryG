import axios from "axios";
import { defaultConfig } from "next/dist/server/config-shared";

export async function submitHandler(props) {
  console.log("Submitted data in SubmitHandler", props);
  const userInput = props.userInput;
  const searchType = props.searchType;
  const sessionID = props.sessionID;

  let type = searchType;
  let nameOrURL = userInput;

  try {
    props.setGuruCognating(true);

    const summaryResponse = axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=summary&token=150`);

    const reviewResponse = axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=review&token=250`);

    const onewordResponse = axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=oneword&token=100`);

    const promises = [summaryResponse, reviewResponse, onewordResponse];

    // prompt for a title if a URL
    if (searchType == 'articles') {
      const name = axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=title&token=100`);
      promises.push(name);
    } else {
      //otherwise, prompt for similar content
      const similarResponse = axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=similar&token=100`);
      promises.push(similarResponse);
    }

    Promise.all(promises)
      .then(async (all) => {
        const summary = all[0].data.parsedResponse;
        const review = all[1].data.parsedResponse;
        const oneword = all[2].data.parsedResponse;
        let similar;

        if (type == 'articles') {
          nameOrURL = all[3].data.parsedResponse;
          similar = `https://www.google.com/search?q=${nameOrURL}`;
        } else {
          similar = all[3].data.parsedResponse;
        }
        // const results = { summary, review, oneword, similar };

        // const searchURL = "/api/searchdb/?type=" + type + "&searchTerm=" + nameOrURL + "&sessionID=" + sessionID + "&summary=" + summary + "&review=" + review + "&oneword=" + oneword + "&similar=" + similar;

        // console.log("searchURL in SubmitHandler", searchURL);

        const search = await axios.post('/api/searchdb', {
          type,
          searchTerm: nameOrURL,
          sessionID,
          summary,
          review, 
          oneWordReview: oneword,
          similar
        });

        const searchID = search.data.searchID;
        console.log("searchID in SubmitHandler", searchID);

        const resultID = search.data.resultID;
        console.log("resultID in SubmitHandler", resultID);
        
        props.onSubmit(resultID);
        
        // const resultURL = "/api/resultsdb/?searchID=" + searchID + "&summary=" + summary + "&review=" + review + "&oneword=" + oneword + "&similar=" + similar;

        // console.log("resultURL in SubmitHandler", resultURL);

        // this is where it's crashing
        // const result = await axios.get(resultURL);
      })
      .catch((error) => {
        console.log("Error in Submit", error);
      })
  } catch (error) {
    console.log("Error in the API call", error);
    // handle error if API call on vercel is taking too long. 
  } finally {
    props.setGuruCognating(false);
  }
};

/*
  - summary = 50 word executive summary
  - review = three takeways (article) in 100 words, write a review of the movie in 100 words with one positive and one negative
  - oneword = quote from the article/book/movie
  - similar = similar article/movie/book
*/

const createPrompt = (type, nameOrURL) => {

  let returnval = {};

  if (type == 'articles') {
    returnval.summary = `Write an executive summary of 75 words for the following article: ${nameOrURL}`;
    returnval.review = `Using a numbered list (1, 2, 3), write three takeways in 150 words or less for following article: ${nameOrURL}. Response should be in HTML. Use <ol> to create the list appropriately.`;
    returnval.oneword = `Write the most important quote from the following article: ${nameOrURL}`;
    returnval.similar = `Recommend only the name and URL for an article that is similar to the following article: ${nameOrURL}`;
    returnval.title = `What is the title or heading of the following article: ${nameOrURL}`;
  } else if (type == 'books') {
    returnval.summary = `Write an executive summary of 75 words for the following book: ${nameOrURL}. Include the name of the author and main characters (if possible).`;
    returnval.review = `Write a review of the book '${nameOrURL}' in 150 words or less. Include one positive and one negative aspect of the book. Response should be in HTML. Use <p> to create paragraphs appropriately.`;
    returnval.oneword = `Write a famous quote from the following book: ${nameOrURL}`;
    returnval.similar = `Recommend only the name of one book similar to: ${nameOrURL}`;
  } else {
    returnval.summary = `Write an executive summary of 75 words for the following movie: ${nameOrURL}. Include the main cast and the director.`;
    returnval.review = `Write a review of the movie '${nameOrURL}' in 150 words or less. Include one positive and one negative aspect of the movie. Response should be in HTML. Use <p> to create paragraphs appropriately.`;
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

export default function Submit(props) {

  return (
    <></>
  );
}