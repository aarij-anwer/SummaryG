import styles from '@/styles/Home.module.css'

export default function Loading(props) {

  return (
    <div className={styles.loading  + ' ' + (!props.guruCognating ? styles.hidden : '')}>
      {/* <img className={styles.loadingimage} src='/robot.png'/> */}
      <div className={styles.loadingmessage}>
        <span className={styles.loadingtext}>SummaryAI is calling ChatGPT...</span>
        <img src='/openAI.png' className={styles.rotate} />
      </div>
    </div>
  );
}