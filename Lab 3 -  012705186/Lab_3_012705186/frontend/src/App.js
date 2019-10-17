import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Main from './components/Main';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});


class App extends Component {
  render() {
    return (<BrowserRouter>
      <ApolloProvider client={client}>
      <div>   
        <Main/>
      </div>
      </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
