/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER } from '../queries/index';

interface ICharacterDetails extends INavigationProps { }

type EpisodeItem = {
  episode: string;
  name: string;
  air_date: string;
};

const styles = StyleSheet.create({
  header: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});

const Episodes = ({ episode, name, air_date }: EpisodeItem) => {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ marginBottom: 4 }}>{episode}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Text style={styles.header}>Title: </Text>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.header}>Air Date: </Text>
        <Text style={styles.text}>{air_date}</Text>
      </View>
    </View>
  );
};

const CharacterDetails = ({ route }: ICharacterDetails) => {
  const { loading, data } = useQuery(GET_CHARACTER, {
    variables: { id: route?.params.id },
    fetchPolicy: 'cache-first',
  });

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" style={{ marginTop: 50 }} />}
      {!loading && (
        <React.Fragment>
          <Image source={{ uri: data?.character.image }} style={styles.image} />
          <View style={styles.row}>
            <Text style={styles.header}>Name: </Text>
            <Text style={styles.text}>{data?.character.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.header}>Gender: </Text>
            <Text>{data?.character.gender}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.header}>Species: </Text>
            <Text>{data?.character.species}</Text>
          </View>
          <Text style={[styles.header, { paddingBottom: 5 }]}>Episodes:</Text>
          <FlatList
            data={data?.character.episode}
            renderItem={({ item }) => <Episodes {...item} />}
            keyExtractor={(item, index) => `${index}`}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </React.Fragment>
      )}
    </View>
  );
};

export default CharacterDetails;
