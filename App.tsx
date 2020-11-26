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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import CharacterList from './app/screens/CharacterList';
import CharacterDetails from './app/screens/CharacterDetails';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: false,
            merge(existing = { results: [] }, incoming) {
              let data = existing.results;
              if (incoming.results) {
                data = [
                  ...existing.results,
                  ...incoming.results,
                ]
              }
              return { ...incoming, results: data };
            }
          }
        }
      }
    }
  }),
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen
            name="List"
            component={CharacterList}
            options={{ headerTitle: 'Characters List' }}
          />
          <Stack.Screen
            name="Details"
            component={CharacterDetails}
            options={{
              headerBackTitle: 'C-List',
              headerTitle: 'Character Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
