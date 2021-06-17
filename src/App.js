import './App.css';
import {Home,Login, Panel} from './components';
import { UserContextProvider } from './contexts';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {PATHS} from './strings';

const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path={PATHS.HOMEPAGE}>
              <Home />
            </Route>
            <Route path={PATHS.LOGIN}>
              <Login />
            </Route>
            <Route path={PATHS.EMPLOYEE_PANEL}>
              <Panel />
            </Route>
          </Switch>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
