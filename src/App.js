import './App.css';
import { Home,Login, Panel } from './components';
import { UserContextProvider } from './contexts';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PATHS,EMPLOYEE_MODES } from './strings';
import { AddEmployee, AddArticle, AddMovie, ViewEmployees, ViewMovies, ViewArticles, ViewPerformances } from './components/Modes';
import { NewsPage, ArticlePage, MoviesPage, PerformancesPage, MoviePage } from './components/Pages';


const App = () => {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path={PATHS.HOMEPAGE}>
              {/*<Home />*/}
              <PerformancesPage/>
            </Route>
            <Route exact path={PATHS.MOVIES}>
              <MoviesPage />
            </Route>
            <Route path={PATHS.MOVIE_VIEW}>
              <MoviePage/>
            </Route>
            <Route exact path={PATHS.ARTICLES}>
              <NewsPage/>
            </Route>
            <Route path={PATHS.ARTICLE_VIEW}>
              <ArticlePage/>
            </Route>
            <Route exact path={PATHS.PERFORMANCES}>
              <PerformancesPage/>
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
            <Route path={EMPLOYEE_MODES.find(({key})=> key==='view-employees').path}>
              <ViewEmployees/>
            </Route>
            <Route path={EMPLOYEE_MODES.find(({key})=> key==='add-article').path}>
              <AddArticle/>
            </Route>
            <Route path={EMPLOYEE_MODES.find(({key})=> key==='view-articles').path}>
              <ViewArticles/>
            </Route> 
            <Route path ={EMPLOYEE_MODES.find(({key})=> key==='add-movie').path}>
              <AddMovie/>
            </Route>
            <Route path={EMPLOYEE_MODES.find(({key})=> key==='view-movies').path}>
              <ViewMovies/>
            </Route>
            <Route path={EMPLOYEE_MODES.find(({key})=> key==='view-performances').path}>
              <ViewPerformances/>
            </Route>
          </Switch>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
