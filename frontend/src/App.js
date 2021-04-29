import React from 'react';
import './App.css';
import Header from './components/Header';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CollegeList from './components/CollegeList';
import CollegeInfo from './components/CollegeInfo';
import StudentInfo from './components/StudentInfo';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />

        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/college-list/:type/:key/' component={CollegeList} />
          <Route path='/college-info/:id' component={CollegeInfo} />
          <Route path='/student-info/:id' component={StudentInfo} />
          <Redirect to='/dashboard' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
