import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ICharacterDetails extends INavigationProps { }

const CharacterDetails = ({ navigation }: ICharacterDetails) => {
  return (
    <View>
      <Text onPress={() => navigation?.navigate('List')}>Details</Text>
    </View>
  );
};

export default CharacterDetails;
