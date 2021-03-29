import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { createUser } from './userSlice';
import Input from '../../common/components/input/Input';
import Button from '../../common/components/button/Button';
import styles from './UserSignup.module.css';

const UserSignup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const signUp = () => {
    dispatch(createUser({email})).then(() => {
      history.push('/app');
    });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Signup</h1>
      <Input 
        onChange={(e) => { setEmail(e.target.value) }} 
        placeholder="Enter your email" 
        value={email} 
      />
      <Button text="Signup" onClick={signUp} />
      <Link to="/login">Login here</Link>
    </div>
  );
}

export default UserSignup;