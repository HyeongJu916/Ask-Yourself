import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StartTest from './components/StartTest';
import TestResult from './components/TestResult';
import Moment from 'moment';

function App() {
  let dateGenerated = new Moment("2/2/2021").format('YYYY/MM/DD');
  return (
    <div className='App'>
      <StartTest testId = "1" testName = "Test1" dateGenerated = {dateGenerated} testDate = {new Date().toLocaleString()}/>
    </div>
  );
}

export default App;
