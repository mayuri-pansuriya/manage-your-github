import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

var httpuri = `https://api.github.com/graphql`;
var wsuri = `ws://api.github.com/graphql`;

const httpLink = new HttpLink({ uri: httpuri });

const wsLink = new WebSocketLink({
  uri: wsuri,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const accessToken = localStorage.getItem('access_token');
    alert("TCL: accessToken", accessToken)

    if (accessToken) headers = { ...headers, 'Authorization': accessToken ? `bearer ${accessToken}` : '' };

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ gqlErr, networkError }) => {
  if (gqlErr) gqlErr.map(({ message }) => (message === 'UNAUTHENTICATED') ? console.log("This request is not authenticated.") : null);
  if (networkError) if (networkError.statusCode === 401) console.log("A network error occurred", networkError);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, terminatingLink]),
  cache: new InMemoryCache(),
});

export default client;