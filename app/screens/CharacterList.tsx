import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ICharacterList extends INavigationProps { }


const CharacterList = ({ navigation }: ICharacterList) => {
  return (
    <View>
      <Text onPress={() => navigation?.navigate('Details')}>List Screen</Text>
    </View>
  );
};

export default CharacterList;
