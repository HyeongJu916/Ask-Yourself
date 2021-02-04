import './App.css';
import { Link, Router } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StartTest from './components/StartTest';

function App() {
  return (
    <StartTest/>
    /*<div className='App'>
      <Router>
        <Link to='/signin'>로그인</Link>
        <Link to='/signup'>회원가입</Link>
      </Router>
    </div>*/
  );
}

export default App;
