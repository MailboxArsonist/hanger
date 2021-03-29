import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { fetchUser } from './userSlice';
import Input from '../../common/components/input/Input';
import Button from '../../common/components/button/Button';
import styles from './UserLogin.module.css';

const UserLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const signIn = () => {
    dispatch(fetchUser({email})).then(() => {
      history.push('/app');
    });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <Input 
        onChange={(e) => { setEmail(e.target.value) }} 
        placeholder="Enter your email" 
        value={email} 
      />
      <Button text="Login" onClick={signIn} />
      <Link to="/">Sign up here</Link>
    </div>
  );
}

export default UserLogin;