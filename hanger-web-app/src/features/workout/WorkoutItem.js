import { Link } from 'react-router-dom'
import formatSecondsToTime from '../../common/utils/formatTime'
import styles from './WorkoutItem.module.css';


const WorkoutItem = ({workout}) => (
  <Link 
    to={`/app/workouts/${workout.SK}`} 
    className={styles.button} 
    onClick={workout.onClick}
  >
    <span>{workout.name}</span>
    <span className={styles.time}>
      Workout time: {formatSecondsToTime(workout.totalTime)}
    </span>
  </Link>
);

export default WorkoutItem;