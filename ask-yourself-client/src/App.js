import './App.css';
import React, { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
// import About from "./About";
// import NotFound from "./NotFound";

function App() {
 
  return (
    <Router>
      <header className="flexContainer">
      <Link to="/">
        <a onClick={() => {window.location.href="./"}} className="askYourself">Ask Yourself</a>
        </Link>
      <Link to="/">
        <div className="nav">
        <a onClick={() => {window.location.href="./"}}>나의 테스트</a>
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
         
          <Route exact path="/" render={() => <Home userid="1" />}/>
          {/* <Route path="/about" component={About} />
          <Route component={NotFound} /> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
