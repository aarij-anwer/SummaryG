import axios from "axios";

export default function InitialLoad(props) {


  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setGuruCognating(true);
    const userInput = props.suggested?.url;
    const searchType = "articles";
    const sessionID = props.sessionID;

    //make API call to openai, passing userInput, searchType (article/movie/book) and a sessionID

    // new and improved API call, asynchronous
    try {
      const result = await axios.get(`/api/openaicopy/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}`);

      //update searchIdState, causing index.js to re-render
      props.onSubmit(result.data.sID);

      console.log("result", result);

      clearInputRef();
    } catch (error) {
      console.log("Error in the API call", error);
    } finally {
      props.setGuruCognating(false);
    }
  };

  return (
    <div className={`flex justify-evenly items-center w-full h-full ${props.searchIdState ? 'hidden' : ''}`}>
      <div>
        <p className="text-4xl text-black">Enter a URL for a rich summary of an article, or the name of a movie/book for a review!</p>
        <p className="text-xl text-black">Need some inspiration? Click on the article below and watch SummaryAI work!</p>
        <form onSubmit={handleSubmit} autoComplete="off">
          <button className="text-blue" type="submit">{props.suggested?.title}</button>
        </form>
      </div>
    </div>
  );
}