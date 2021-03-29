import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { selectUserId } from '../user/userSlice';
import { createWorkout } from './workoutSlice';
import Button from '../../common/components/button/Button';
import Input from '../../common/components/input/Input';
import Label from '../../common/components/label/Label';
import styles from './WorkoutCreate.module.css';

const WorkoutCreate = () => {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [intervals, setIntervals] = useState(5);
  const [intervalTime, setIntervalTime] = useState(20);
  const [restTime, setRestTime] = useState(30);
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
      name,
      intervals,
      intervalTime,
      restTime
    };

    dispatch(createWorkout(params)).then(() => {
      //redirect to list
      history.push('/app');
    });
  }

  return (
    <form className={styles.form}>
      <h1>Create workout</h1>

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
    </form>
  );
}

export default WorkoutCreate;