import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import useAuthContext from './hooks/useAuthContext';
import Home from './views/Home/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Navbar from './components/Navbar';

function App() {

  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      { authIsReady && (
        <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {!user && <Redirect to="/login" />}
            {user && <Home/>}
          </Route>
          <Route path="/login">
            {user && <Redirect to="/" />}
            {!user && <Login/> }
          </Route>
          <Route path="/signup">
            {user && <Redirect to="/" />}
            {!user && <Signup/>}
          </Route>
        </Switch>
       </Router>
      )}
    </div>
  );
}

export default App;
