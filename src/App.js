import './App.css';
import {Home,Login, Panel} from './components';
import { UserContextProvider } from './contexts';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {PATHS,EMPLOYEE_MODES} from './strings';
import { AddEmployee, AddArticle, AddMovie } from './components/Modes';


const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path={PATHS.HOMEPAGE}>
              <Home />
            </Route>
            <Route exact path={PATHS.MOVIES}>

            </Route>
            <Route exact path={PATHS.ARTICLES}>

            </Route>
            <Route exact path={PATHS.PERFORMANCES}>

            </Route>
            <Route exact path={PATHS.RESERVATIONS}>
              
            </Route>
            <Route path={PATHS.LOGIN}>
              <Login />
            </Route>
            <Route exact path={PATHS.EMPLOYEES}>
              <Panel />
            </Route>
            <Route path={EMPLOYEE_MODES.find(({key}) => key==='add-employee').path}>
              <AddEmployee />
            </Route>
            <Route path={EMPLOYEE_MODES.find(({key})=> key==='add-article').path}>
              <AddArticle/>
            </Route> 
            <Route path ={EMPLOYEE_MODES.find(({key})=> key==='add-movie').path}>
              <AddMovie/>
            </Route>
          </Switch>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
