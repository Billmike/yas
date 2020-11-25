import React from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ISearch extends TextInputProps { }

const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
});

const Search = ({ onChangeText }: ISearch) => {
  return (
    <View style={styles.searchView}>
      <MaterialIcons name="search" size={25} />
      <TextInput placeholder="Find a character" style={styles.input} onChangeText={onChangeText} />
    </View>
  );
};

export default Search;
