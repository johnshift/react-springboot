import 'virtual:windi.css';
import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import Login from './pages/Login';

const NotFound = () => <h1>Not Found</h1>;

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
