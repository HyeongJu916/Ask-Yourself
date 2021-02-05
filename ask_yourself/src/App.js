import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StartTest from './components/StartTest';
import TestResult from './components/TestResult';
import Moment from 'moment';
import MyGroups from './components/MyGroups';
import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Group from './components/Group';
// import About from "./About";
// import NotFound from "./NotFound";

function App() {
  let dateGenerated = new Moment("2/2/2021").format('YYYY/MM/DD');
  return (
    /*<StartTest testId = "1" testName = "Test1" dateGenerated = {dateGenerated} testDate = {new Date().toLocaleString()}/>*/
    <Router>
      <header className="flex-container">
      <Link to="/">
        <a onClick={() => {window.location.href="./"}} className="Ask-for-Question">Ask Yourself</a>
        </Link>
      <Link to="/">
        <div className="nav">
        <a onClick={() => {window.location.href="./"}}>나의 테스트</a>
        </div>
        </Link>
        <Link to="/group">
          <div className="nav">
            나의 그룹
          </div>
        </Link>
        <Link to="/find">
          <div className="nav">
            찾아보기
          </div>
        </Link>
      </header>
      <main>
        {/*<div className='App'>
          <MyGroups uid="2" gid="1" />
        </div>*/}
        <Route exact path="/" render={() => <Home userid="1" />}/>
        <Switch>
          <Route path = "/group/:gid" component = { Group } />
          <Route path="/group" component = { MyGroups }/>
          {/* <Route path="/about" component={About} />
          <Route component={NotFound} /> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
