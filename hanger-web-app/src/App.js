import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie';
import { selectUserEmail, fetchUser, selectUserId } from './features/user/userSlice';
import { fetchWorkouts } from './features/workout/workoutSlice';
import { fetchHistory } from './features/history/historySlice';
import UserLogin from './features/user/UserLogin';
import WorkoutList from './features/workout/WorkoutList';
import HistoryList from './features/history/HistoryList';
import WorkoutDetail from './features/workout/WorkoutDetail';
import WorkoutEdit from './features/workout/WorkoutEdit';
import WorkoutCreate from './features/workout/WorkoutCreate';
import Header from './common/components/header/Header';
import UserSignup from './features/user/UserSignup';
import './App.css';

function App() {
  const [cookies, setCookie] = useCookies(['email']);
  const userEmail = useSelector(selectUserEmail);
  const userId = useSelector(selectUserId);
  const history = useHistory();
  const dispatch = useDispatch();

  // persist the email in cookies and login (I know this isn't great but I just wanted to have a little login/remember functionality without having to manage a session etc.. )
  useEffect(() => {
    if(userEmail) {
      setCookie('email', userEmail, { path: '/' });
    } else if(cookies.email) {
      dispatch(fetchUser({email: cookies.email}));
    }
  }, [userEmail, cookies, history, setCookie, dispatch]);

  useEffect(() => {
    if(userId) {
      dispatch(fetchHistory(userId));
      dispatch(fetchWorkouts(userId));
    }
  }, [userId, dispatch]);

  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>

          <Route exact path="/">
            <UserSignup />
          </Route>
          <Route exact path="/login">
            <UserLogin />
          </Route>

          <Route exact path="/app">
            <WorkoutList />
            <Link className="btn" to="/app/workouts/create">Create new workout</Link>
            <HistoryList />
          </Route>

          <Route exact path="/app/workouts/create" component={WorkoutCreate} />
          <Route exact path="/app/workouts/:id" component={WorkoutDetail} />
          <Route exact path="/app/workouts/:id/edit" component={WorkoutEdit} />

          <Redirect to="/" />
          
        </Switch>

      </div>
    </Router>
  );
}

export default App;
