import styles from '@/styles/Home.module.css'

export default function Navigation(props) {

  return (
    <nav className={styles.navbar}>
      <button
        className={styles.articles + ' ' + styles.buttons}
        onClick={() => props.onSearchTypeChange('articles')}
      >
        Articles
      </button>
      <button
        className={styles.movies + ' ' + styles.buttons}
        onClick={() => props.onSearchTypeChange('movies')}
      >
        Movies
      </button>
      <button
        className={styles.books + ' ' + styles.buttons}
        onClick={() => props.onSearchTypeChange('books')}
      >
        Books
      </button>
    </nav>
  );
}