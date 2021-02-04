import './App.css';
import React from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
// import About from "./About";
// import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <header className="flex-container">
        <Link to="/">
          <div className="Ask-for-Question">Ask for Question</div>
        </Link>
        <Link to="/">
          <div className="nav-first">
            나의 테스트
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
      <hr />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/about" component={About} />
          <Route component={NotFound} /> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
