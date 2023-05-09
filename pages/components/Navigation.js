import styles from '@/styles/Home.module.css'

export default function Navigation(props) {

  return (
      <nav className={styles.navbar}>
        <button className={styles.articles + ' ' + styles.buttons}>Articles</button>
        <button className={styles.movies + ' ' + styles.buttons}>Movies</button>
        <button className={styles.books + ' ' + styles.buttons}>Books</button>
      </nav>
  );
}