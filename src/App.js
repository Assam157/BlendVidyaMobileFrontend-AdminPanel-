import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage' 
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router> 
       <Routes>
      <Route
          path="/"
          element={
              <RegisterPage/>
          }
        />
        <Route
        path="/login"
        element={
          <LoginPage/>
        }/>
        <Route
        path='/dashboard'
        element={
          <Dashboard/>
        }
        ></Route>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
