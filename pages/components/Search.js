import { useRef } from "react"
import axios from "axios";

export default function Search(props) {
  const inputRef = useRef();

  const clearInputRef = () => {
    inputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setGuruCognating(true);
    console.log(`Guru says ${props.guruSays}`);
    const userInput = inputRef.current.value;
    const searchType = props.searchType;
    const result = await axios.get(`/api/openai/?userInput=${userInput}&searchType=${searchType}`);
    props.onSubmit(result.data.sID);

    console.log("result", result);

    clearInputRef();
    props.setGuruCognating(false);
    console.log(`Guru says ${props.guruSays}`);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <input
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="search"
          ref={inputRef}
          placeholder={props.searchType == "articles" ? "Enter article URL" : `Enter ${props.searchType.slice(0, -1)} title`}
          required
        />
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
    </form>
  );
}