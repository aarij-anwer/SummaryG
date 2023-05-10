import { useRef } from "react"
import axios from "axios";
import styles from '@/styles/Home.module.css'

export default function Search(props) {
  const inputRef = useRef();

  const onClear = () => {
    inputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInput = inputRef.current.value;
    const searchType = props.searchType
    axios.post('/api/searchAPI', {userInput, searchType})

    onClear();
  }

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
          placeholder="Enter URL or search term"
        />
      </form>
      <button className={styles.searchbutton} onClick={handleSubmit}>Search</button>
    </div>
  );
}