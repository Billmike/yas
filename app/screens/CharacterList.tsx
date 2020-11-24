import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import Search from '../components/Search';

interface ICharacterList extends INavigationProps { }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});

const CharacterList = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled>
        <Search />
        <Text>Haba</Text>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CharacterList;
