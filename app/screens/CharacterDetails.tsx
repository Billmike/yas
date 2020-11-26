/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Animated,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER } from '../queries';
import Error from '../components/ErrorView';
import {
  HEADER_MAX_HEIGHT,
  CHARACTER_PROFILE_MAX_HEIGHT,
  HEADER_MIN_HEIGHT,
  CHARACTER_PROFILE_MIN_HEIGHT,
} from '../constants';

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
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
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
  imageHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  imageView: {
    borderRadius: CHARACTER_PROFILE_MAX_HEIGHT / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: HEADER_MAX_HEIGHT - CHARACTER_PROFILE_MAX_HEIGHT / 2,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(1, 34, 36, 1)',
    width: '100%',
    height: '100%',
    opacity: 0.4,
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
  const { loading, data, error } = useQuery(GET_CHARACTER, {
    variables: { id: route?.params.id },
    fetchPolicy: 'cache-first',
  });
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));
  const inputRange = [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT];

  const headerHeight = scrollY.interpolate({
    inputRange,
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerZIndex = scrollY.interpolate({
    inputRange,
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const profileImageHeight = scrollY.interpolate({
    inputRange,
    outputRange: [CHARACTER_PROFILE_MAX_HEIGHT, CHARACTER_PROFILE_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileMarginTop = scrollY.interpolate({
    inputRange,
    outputRange: [
      HEADER_MAX_HEIGHT - CHARACTER_PROFILE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT,
    ],
    extrapolate: 'clamp',
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + CHARACTER_PROFILE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT -
      HEADER_MIN_HEIGHT +
      5 +
      CHARACTER_PROFILE_MIN_HEIGHT +
      25,
    ],
    outputRange: [-20, -20, -20, 10],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageHeader,
          { height: headerHeight, zIndex: headerZIndex },
        ]}>
        <Image
          source={{ uri: data?.character.image || '' }}
          style={{ flex: 1, height: undefined, width: undefined }}
        />
        <View style={styles.overlay} />
        <Animated.View
          style={{
            position: 'absolute',
            bottom: headerTitleBottom,
            left: 0,
            right: 0,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#fff',
            }}>
            {data?.character.name}
          </Text>
        </Animated.View>
      </Animated.View>
      {error && <Error text="Error fetching your request. Please try again" />}
      {loading && <ActivityIndicator size="large" style={{ marginTop: 50 }} />}
      <ScrollView
        style={{ flex: 1 }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.imageView,
            {
              height: profileImageHeight,
              width: profileImageHeight,
              marginTop: profileMarginTop,
            },
          ]}>
          <Image
            source={{ uri: data?.character.image }}
            style={{ flex: 1, height: undefined, width: undefined }}
          />
        </Animated.View>
        <Text
          style={[
            styles.text,
            { fontSize: 25, fontWeight: 'bold', marginBottom: 10 },
          ]}>
          {data?.character.name}
        </Text>
        <View style={styles.row}>
          <Text style={styles.header}>Gender: </Text>
          <Text style={styles.text}>{data?.character.gender}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.header}>Specie: </Text>
          <Text style={styles.text}>{data?.character.species}</Text>
        </View>
        <Text style={[styles.header]}>Episodes:</Text>
        <FlatList
          data={data?.character.episode}
          renderItem={({ item }) => <Episodes {...item} />}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
        <View style={{ height: 1000 }} />
      </ScrollView>
    </View>
  );
};

export default CharacterDetails;
