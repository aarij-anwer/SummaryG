import styles from '@/styles/Home.module.css'

export default function Search(props) {

  return (
    <div className={styles.searchbar}>
      <form className={styles.searchform} onSubmit={event => event.preventDefault()} autoComplete="off">
        <input
          className={styles.searchbox}
          name="searchTerm"
          type="text"
          placeholder="Enter URL"
          value={''}
          onChange={''}
        />
      </form>
      <button className={styles.searchbutton} onClick={''}>Search</button>
    </div>
  );
}