import './App.css';
import {Home} from './components';
// import {Login} from './components/Login/Login';
// import {Panel} from './components/Panel/Panel'; 
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {PATHS} from './strings';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={PATHS.HOMEPAGE}>
            <Home />
          </Route>
          {/* <Route path={PATHS.LOGIN}>
            <Login />
          </Route>
          <Route path={PATHS.EMPLOYEE_PANEL}>
            <Panel />
          </Route>*/ } 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
