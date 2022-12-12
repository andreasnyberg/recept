import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';
import '../styles/App.scss';
import Recipe from './Recipe'; 
import Home from './Home';
import ErrorPage from './ErrorPage';
import withDialog from './hoc/withDialog';

function App(props) {
  const RecipeWithDialog = withDialog(Recipe)

  return (
    <div className="App">
      <Router>
        <HashRouter basename="/">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/:path">
              <RecipeWithDialog />
            </Route>

            <Route path="*">
              <ErrorPage>
                <h1>Ooops..</h1>
                <h3>Denna sida verkar inte existera 😕</h3>
              </ErrorPage>
            </Route>
          </Switch>
        </HashRouter>
      </Router>
    </div>
  );
}

export default App;
