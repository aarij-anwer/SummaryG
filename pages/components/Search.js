import { useRef } from "react"
import axios from "axios";
import styles from '@/styles/Home.module.css'

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
      const result = await axios.get(`/api/openai/?userInput=${userInput}&searchType=${searchType}&sessionID=${sessionID}`);
      props.onSubmit(result.data.sID);

      console.log("result", result);

      clearInputRef();
      props.setGuruCognating(false);
      console.log(`Guru says ${props.guruSays}`);
    }
  };


  return (
    <div className={styles.searchbar}>
      <form
        className={styles.searchform}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
          className={styles.searchbox + ' ' + styles[props.searchType]}
          name="searchTerm"
          type="text"
          ref={inputRef}
          placeholder={props.searchType == "articles" ? "Enter article URL" : `Enter ${props.searchType.slice(0, -1)} title`}
        />
      </form>
      <button className={styles.searchbutton} onClick={handleSubmit}>Search</button>
    </div>
  );
}