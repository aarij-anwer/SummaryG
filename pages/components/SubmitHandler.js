import axios from "axios";
import { defaultConfig } from "next/dist/server/config-shared";

export async function submitHandler(props) {
  console.log("Submitted data in SubmitHandler", props);
  const userInput = props.userInput;
  const searchType = props.searchType;
  const sessionID = props.sessionID;

  let type = searchType;
  let nameOrURL = userInput;
  let summary = "OpenAI took too long to respond. Our apologies. Please try the search again.";
  let review = "OpenAI took too long to respond. Our apologies. Please try the search again.";
  let oneword = "OpenAI took too long to respond. Our apologies. Please try the search again.";
  let similar = "OpenAI took too long to respond. Our apologies. Please try the search again.";

  try {
    //summary
    axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=summary&token=130`)
      .then((response) => {
        summary = response.data.parsedResponse;
      })
      .catch((error) => {
        console.log("Summary took too long", error);
        summary = "OpenAI took too long to respond. Our apologies. Please try the search again.";
      });

    //oneword or quote
    axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=oneword&token=100`)
      .then((response) => {
        oneword = response.data.parsedResponse;
      })
      .catch((error) => {
        console.log("OneWord took too long", error);
        oneword = "OpenAI took too long to respond. Our apologies. Please try the search again.";
      });

    // prompt for a title if a URL
    if (searchType == 'articles') {
      axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=title&token=100`)
        .then((response) => {
          nameOrURL = response.data.parsedResponse;
          similar = `https://www.google.com/search?q=${nameOrURL}`;
        })
        .catch((error) => {
          console.log("OneWord took too long", error);
          similar = "OpenAI took too long to respond. Our apologies. Please try the search again.";
        });
    } else {
      //otherwise, prompt for similar content
      axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=similar&token=100`)
        .then((response) => {
          similar = response.data.parsedResponse;
        })
        .catch((error) => {
          console.log("Similar took too long", error);
          similar = "OpenAI took too long to respond. Our apologies. Please try the search again.";
        });
    }

    //review 
    axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=review&token=200`)
      .then((response) => {
        review = response.data.parsedResponse;
      })
      .catch((error) => {
        console.log("Review took too long", error);
        review = "OpenAI took too long to respond. Our apologies. Please try the search again.";
      })
      .finally(async () => {
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
        props.setGuruCognating(false);
      });
  } catch (error) {
    console.log("Something went wrong with OpenAI - see line 71");
    console.log(error);
  } finally {
    console.log("Finally");
  }
}

//   try {
//     props.setGuruCognating(true);


//     const summaryResponse = axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=summary&token=130`);

//     const reviewResponse = axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=review&token=200`);

//     const onewordResponse = axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=oneword&token=100`);

//     const promises = [summaryResponse, reviewResponse, onewordResponse];

//     // prompt for a title if a URL
//     if (searchType == 'articles') {
//       const name = axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=title&token=100`);
//       promises.push(name);
//     } else {
//       //otherwise, prompt for similar content
//       const similarResponse = axios.get(`/api/apicalls/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}&type=similar&token=100`);
//       promises.push(similarResponse);
//     }

//     Promise.all(promises)
//       .then(async (all) => {
//         const summary = all[0].data.parsedResponse;
//         const review = all[1].data.parsedResponse;
//         const oneword = all[2].data.parsedResponse;
//         let similar;

//         if (type == 'articles') {
//           nameOrURL = all[3].data.parsedResponse;
//           similar = `https://www.google.com/search?q=${nameOrURL}`;
//         } else {
//           similar = all[3].data.parsedResponse;
//         }

//         const search = await axios.post('/api/searchdb', {
//           type,
//           searchTerm: nameOrURL,
//           sessionID,
//           summary,
//           review,
//           oneWordReview: oneword,
//           similar
//         });

//         const searchID = search.data.searchID;
//         console.log("searchID in SubmitHandler", searchID);

//         const resultID = search.data.resultID;
//         console.log("resultID in SubmitHandler", resultID);

//         props.onSubmit(resultID);

//       })
//       .catch((error) => {
//         console.log("Error in Submit", error);
//       })
//   } catch (error) {
//     console.log("Error in the API call", error);
//     // handle error if API call on vercel is taking too long. 
//   } finally {
//     props.setGuruCognating(false);
//   }
// };

export default function Submit(props) {
  return (
    <></>
  );
}