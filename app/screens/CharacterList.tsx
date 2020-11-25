import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@apollo/client';
import Search from '../components/Search';
import { GET_CHARACTERS } from '../queries/index';

interface ICharacterList extends INavigationProps { }

type ItemProp = {
  item: {
    id: string;
    name: string;
    image: string;
  };
  handleItemPress: (id: string) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  image: {
    height: 250,
    width: '100%',
  },
  list: {
    marginTop: 25,
    paddingBottom: 100,
  },
  name: {
    marginVertical: 15,
    textAlign: 'center',
  },
});

const Item = ({ item, handleItemPress }: ItemProp) => {
  return (
    <TouchableOpacity onPress={() => handleItemPress(item?.id)}>
      <Image
        source={{ uri: item?.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{item?.name}</Text>
    </TouchableOpacity>
  );
};

const CharacterList = ({ navigation }: ICharacterList) => {
  const { loading, data, fetchMore } = useQuery(GET_CHARACTERS, {
    fetchPolicy: 'cache-first',
    variables: {
      name: '',
    },
  });

  const handleItemPress = (id: string) => {
    navigation?.navigate('Details', { id });
  };

  const renderLoading = () => {
    if (loading) {
      return <ActivityIndicator size="large" />;
    }
    return null;
  };

  const handleFetchMore = () => {
    if (data?.characters.info.next) {
      if (fetchMore !== undefined) {
        return fetchMore({
          variables: {
            page: data?.characters?.info.next,
            name: '',
          },
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView enabled>
        <Search />
        <FlatList
          data={data?.characters.results}
          renderItem={({ item }) => (
            <Item item={item} handleItemPress={handleItemPress} />
          )}
          keyExtractor={(item, index) => `${index}`}
          contentContainerStyle={styles.list}
          ListHeaderComponent={renderLoading}
          onEndReached={handleFetchMore}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CharacterList;
