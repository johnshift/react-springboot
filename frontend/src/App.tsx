import 'virtual:windi.css';
import { Route, Switch } from 'wouter';
import Login from './pages/Login';

const Home = () => <h1>Home Page</h1>;
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
