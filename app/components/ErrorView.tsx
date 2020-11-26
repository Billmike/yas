import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type IError = {
  text: string;
};

const styles = StyleSheet.create({
  errorView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

const Error = ({ text }: IError) => {
  return (
    <View style={styles.errorView}>
      <Text testID="error">{text}</Text>
    </View>
  );
};

export default Error;
