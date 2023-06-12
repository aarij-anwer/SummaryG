import { submitHandler } from "./SubmitHandler";

export default function InitialLoad(props) {


  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setGuruCognating(true);
    const userInput = props.suggested?.url;
    const searchType = "articles";
    const sessionID = props.sessionID;
    const onSubmit = props.onSubmit;
    const setGuruCognating = props.setGuruCognating;

    submitHandler({ userInput, searchType, sessionID, onSubmit, setGuruCognating });
  };

  return (
    <div className={`flex justify-evenly items-center w-full h-full ${props.searchIdState ? 'hidden' : ''}`}>
      <div>
        <p className="text-3xl text-black">Enter a URL for a rich summary of an article, or the name of a movie/book for a review!</p><p>&nbsp;</p>
        {props.suggested?.title && (
          <><p className="text-xl text-black">Looking for inspiraton? Click on the article below and watch SummaryAI work!&nbsp;
            <span className="inline-block animate-bounce rounded-full p-1 bg-teal-400 text-white text-sm">
              <svg className="w-6 h-6 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
            </span></p><p>&nbsp;</p>
            <form onSubmit={handleSubmit} autoComplete="off">
              <p className="text">
                <button className="text-blue" type="submit">{props.suggested?.title}
                </button>
              </p>
            </form>
          </>)}
      </div>
    </div>
  );
}