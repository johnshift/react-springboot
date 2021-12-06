import { ChakraProvider } from '@chakra-ui/react';
import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import Login from './pages/Login';
import theme from './theme';

import './reset.css';

const NotFound = () => <h1>Not Found</h1>;

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </ChakraProvider>
  );
}

export default App;
