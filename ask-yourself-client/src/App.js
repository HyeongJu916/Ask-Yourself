import './App.css';
import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import SignIn from './components/SignIn';
import logo_header from './images/Logo_Header.png'
import MyGroups from './components/MyGroups';
// import About from "./About";
// import NotFound from "./NotFound";

function App() {

  return (
    <Router>
      <header className="flexContainer">
      <Link to="/home">
        <a onClick={() => {window.location.href="./home"}}><img src={logo_header} style={{ width:'220px'}}/></a>
        </Link>
        <Link to="/home">

        </Link>
      <Link to="/home">
        <div className="nav" style={{left:'600'}}>
        <a onClick={() => {window.location.href="./home"}}>나의 테스트</a>
        </div>
        </Link>
        <Link to="/group">
          <div className="nav">
          <a onClick={() => {window.location.href="/group"}}>나의 그룹</a>
          </div>
        </Link>
        <Link to="/find">
          <div className="nav">
          <a onClick={() => {window.location.href="/find"}}>찾아보기</a>
          </div>
        </Link>
      </header>
      <main>
        <Switch>
          {/* <Route exact path="/" render={() => <SignIn getAuth={this.getAuth} />} />  */}
          <Route exact path="/home" render={() => <Home 
          // userid={this.userid} 
          />}/>
          <Route path="/group" render={() => <MyGroups
          // userid={this.userid} 
          />}/>
          {/* <Route component={NotFound} /> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
