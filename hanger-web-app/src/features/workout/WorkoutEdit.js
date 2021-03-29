import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserId } from '../user/userSlice';
import { updateWorkout } from './workoutSlice';
import Button from '../../common/components/button/Button';
import Input from '../../common/components/input/Input';
import Label from '../../common/components/label/Label';
import styles from './WorkoutEdit.module.css';

const WorkoutEdit = ({match}) => {
  const SK = match.params.id;
  const workout = useSelector(state => state.workout.data.find(wk => wk.SK === SK));
  const [name, setName] = useState(workout.name);
  const [intervals, setIntervals] = useState(workout.intervals);
  const [intervalTime, setIntervalTime] = useState(workout.intervalTime);
  const [restTime, setRestTime] = useState(workout.restTime);
  const history = useHistory();
  const dispatch = useDispatch();
  const ID = useSelector(selectUserId);

  const saveWorkout = (e) => {
    e.preventDefault();

    // this should obvs be better validation
    if(!name || !intervals || !intervalTime || !restTime){
      alert('You need to fill out all the fields');
      return;
    }

    const params = {
      ID,
      SK,
      name,
      intervals,
      intervalTime,
      restTime
    };

    dispatch(updateWorkout(params)).then(() => {
      //redirect to list
      history.push('/app');
    });
  }

  return (
    <div className={styles.form}>
      <h1>Edit: {workout.name}</h1>

      <Label htmlFor="name">Name</Label>
      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <Label htmlFor="intervals">Intervals</Label>
      <Input id="intervals" value={intervals} type="number" onChange={(e) => setIntervals(e.target.value)} />

      <Label htmlFor="intervalTime">Interval Time (secs)</Label>
      <Input id="intervalTime" value={intervalTime} type="number" onChange={(e) => setIntervalTime(e.target.value)} />

      <Label htmlFor="restTime">Rest Time (secs)</Label>
      <Input id="restTime" value={restTime} type="number" onChange={(e) => setRestTime(e.target.value)} />

      <Button onClick={saveWorkout} text="Save" />
      <Link className="btn" to="/app">Cancel</Link>
    </div>
  );
}

export default WorkoutEdit;