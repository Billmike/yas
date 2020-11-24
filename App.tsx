/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql/',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Text>H i</Text>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
