import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addHistory } from '../history/historySlice';
import Button from '../../common/components/button/Button';
import styles from './WorkoutDetail.module.css';

const WorkoutDetail = ({match}) => {
  const dispatch = useDispatch(); 
  const id = match.params.id;
  const { 
    ID,
    SK,
    name,
    intervals,
    intervalTime,
    restTime,
    totalTime 
  } = useSelector(state => state.workout.data.find(wk => wk.SK === id));
  const history = useHistory();

  const handleAddHistory = () => {
    const params = {
      ID,
      name,
      totalTime,
      SK
    }
    dispatch(addHistory(params)).then(() => {
      //redirect to list
      history.push('/app');
    });
  }
  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <p>Intervals : {intervals}</p>
      <p>Interval time : {intervalTime}</p>
      <p>Rest time : {restTime}</p>
      <p>Total workout time : {totalTime}</p>
      <Button onClick={handleAddHistory} text="Mark workout as done" />
      <Link className="btn" to={`/app/workouts/${id}/edit`}>Eist</Link>
      <Link className="btn" to="/app">Back</Link>
    </div>
  );
}

export default WorkoutDetail;