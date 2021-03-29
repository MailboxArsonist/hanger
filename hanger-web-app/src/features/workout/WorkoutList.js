import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllWorkouts, fetchWorkouts } from './workoutSlice';
import { selectUserId } from '../user/userSlice';
import { Loader } from '../../common/components/loader/Loader'
import WorkoutItem from './WorkoutItem'
import styles from './WorkoutList.module.css';

const WorkoutList = () => {
  const dispatch = useDispatch();
  const workouts = useSelector(selectAllWorkouts);
  const userID = useSelector(selectUserId);
  const listStatus = useSelector(state => state.workout.listStatus);

  useEffect(() => {
    if (listStatus === 'idle') {
      dispatch(fetchWorkouts(userID))
    }
  }, [listStatus, userID, dispatch]);

  const WorkoutItems = workouts.map(workout => (
    <WorkoutItem workout={workout} key={workout.SK} />
  ));

  return (
    <section className={styles.workouts}>
      <h2>Workouts</h2>
      { listStatus === 'loading' && <Loader /> }
      { listStatus === 'succeeded' && WorkoutItems }
      { (listStatus === 'succeeded' && !workouts.length) && <p>You don't have any workouts</p> }
    </section>
  );
}

export default WorkoutList;
