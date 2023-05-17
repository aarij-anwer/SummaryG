import { useRef } from "react";
import axios from "axios";

export default function Search(props) {
  const inputRef = useRef();

  const clearInputRef = () => {
    inputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      props.setGuruCognating(true);
      console.log(`Guru says ${props.guruSays}`);
      const userInput = inputRef.current.value;
      const searchType = props.searchType;
      const sessionID = props.sessionID;

      //make API call to openai, passing userInput, searchType (article/movie/book) and a sessionID
      const result = await axios.get(`/api/openai/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}`);

      //update searchIdState, causing index.js to re-render
      props.onSubmit(result.data.sID);

      console.log("result", result);

      clearInputRef();
      props.setGuruCognating(false);
      console.log(`Guru says ${props.guruSays}`);
    }
  };

  const getSearchBarColor = () => {
    switch (props.searchType) {
      case "articles":
        return "bg-gray-700 dark:bg-gray-700";
      case "movies":
        return "bg-cyan-700 dark:bg-cyan-700";
      case "books":
        return "bg-emerald-400 dark:bg-emerald-400";
      default:
        return "bg-gray-700 dark:bg-gray-700";
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className={`relative ${getSearchBarColor()}`}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          id="default-search"
          className={`block w-full p-4 pl-10 text-sm text-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${getSearchBarColor()}`}
          type="search"
          ref={inputRef}
          placeholder={props.searchType === "articles" ? "Enter article URL" : `Enter ${props.searchType.slice(0, -1)} title`}
          required
        />
        <button type="submit" className="text-white absolute right-2.5 top-.5 bottom-1.5 bg-transparent hover:bg-amber-500 text-gray-200 font-semibold hover:text-white py-2 px-4 border border-gray-200 hover:border-transparent rounded text-sm">
          Search
        </button>
      </div>
    </form>
  );
}
