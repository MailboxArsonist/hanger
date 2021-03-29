import styles from './HistoryItem.module.css';

const HistoryItem = ({history}) => (
  <div className={styles.container} >
    <span>{history.name}</span>
    <span className={styles.date}>{new Date(history.date).toISOString().substr(0, 10)}</span>
  </div>
);

export default HistoryItem;