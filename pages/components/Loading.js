import styles from '@/styles/Home.module.css'

export default function Loading(props) {

  return (
    <div className={styles.loading  + ' ' + (!props.guruCognating ? styles.hidden : '')}>
      <img className={styles.loadingimage} src='/robot.png'/>
      <span className={styles.loadingmessage}>Guru is Cognating!</span>
    </div>
  );
}