import styles from '@/styles/Home.module.css'

export default function Navigation(props) {

  return (
    <nav className={styles.navbar}>
      <button
        className={styles.articles + ' ' + styles.buttons + ' ' + (props.searchType == 'articles' ? styles.searchtype:'')}
        onClick={() => props.onSearchTypeChange('articles')}
      >
        Articles
      </button>
      <button
        className={styles.movies + ' ' + styles.buttons + ' ' + (props.searchType == 'movies' ? styles.searchtype:'')}
        onClick={() => props.onSearchTypeChange('movies')}
      >
        Movies
      </button>
      <button
        className={styles.books + ' ' + styles.buttons + ' ' + (props.searchType == 'books' ? styles.searchtype:'')}
        onClick={() => props.onSearchTypeChange('books')}
      >
        Books
      </button>
    </nav>
  );
}