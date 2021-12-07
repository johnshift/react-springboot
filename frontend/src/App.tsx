import { ChakraProvider } from '@chakra-ui/react';
import { Route, Switch, useLocation } from 'wouter';
import Home from './pages/Home';
import Login from './pages/Login';
import theme from './theme';

import './reset.css';
import { JWT_HEADER_KEY } from './common/constants';
import Nav from './common/components/Nav';
import { useEffect } from 'react';

const NotFound = () => <h1>Not Found</h1>;

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </ChakraProvider>
  );
}

export default App;
