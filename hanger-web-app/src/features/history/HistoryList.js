import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllHistory, fetchHistory } from './historySlice';
import { selectUserId } from '../user/userSlice';
import { Loader } from '../../common/components/loader/Loader';
import HistoryItem from './HistoryItem';
import styles from './HistoryList.module.css';

const HistoryList = () => {
  const dispatch = useDispatch();
  const history = useSelector(selectAllHistory);
  const userID = useSelector(selectUserId);
  const historyStatus = useSelector(state => state.history.status);

  useEffect(() => {
    if (historyStatus === 'idle') {
      dispatch(fetchHistory(userID));
    }
  }, [historyStatus, userID, dispatch]);

  const HistoryItems = history.map(hist => (
      <HistoryItem key={hist.SK} history={hist} />
  ));

  return (
    <section className={styles.history}>
      <h2>Recent Workouts History</h2>
      { historyStatus === 'loading' && <Loader /> }
      { historyStatus === 'succeeded' && HistoryItems }
      { (historyStatus === 'succeeded' && !history.length) && <p>You don't have any history</p> }
    </section>
  );
}

export default HistoryList;