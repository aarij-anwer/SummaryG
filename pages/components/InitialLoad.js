import styles from '@/styles/Home.module.css'

export default function InitialLoad(props) {

  return (
    <div className={styles.initialload  + ' ' + (props.searchIdState ? styles.hidden : '')}>
      <img className={styles.initialimage} src='/robot.png'/>
      <div>
        <span className={styles.initialmessage}>Search for an Article, Movie, or Book to get a summary, review, quote and similar content!</span>
      </div>
    </div>
  );
}