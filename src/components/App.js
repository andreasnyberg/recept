import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
} from 'react-router-dom';
import '../styles/App.scss';
import Header from './Header';
import AddNew from './AddNew';
import Recipe from './Recipe'; 
import Home from './Home';
import ErrorPage from './ErrorPage';
import withDialog from './hoc/withDialog';

function App(props) {
  const RecipeWithDialog = withDialog(Recipe)
  const AddNewWithDialog = withDialog(AddNew);

  return (
    <div className="App">
      <Router>
        <HashRouter basename="/">
          <Switch>
            <Route exact path="/">
              <Header />
              <Home />
            </Route>

            <Route path="/recept/:pathTitle">
              <RecipeWithDialog />
            </Route>

            <Route path="/add-new">
              <AddNewWithDialog />
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
