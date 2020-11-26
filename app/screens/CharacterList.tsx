/* eslint-disable react-hooks/exhaustive-deps */
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
import { useQuery, useLazyQuery } from '@apollo/client';
import Search from '../components/Search';
import { GET_CHARACTERS, SEARCH_CHARACTERS } from '../queries/index';

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
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchCharacters, { data: searchData }] = useLazyQuery(
    SEARCH_CHARACTERS,
    {
      variables: {
        name: searchQuery,
      },
      fetchPolicy: 'no-cache',
    },
  );
  const [searchResults, setSearchResults] = React.useState([]);

  const handleSearchQuery = React.useCallback(() => {
    searchCharacters();
    if (searchData) {
      setSearchResults(searchData.characters.results);
    }
  }, [searchCharacters, searchData]);

  React.useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    handleSearchQuery();
  }, [searchQuery]);

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
        <Search onChangeText={(value) => setSearchQuery(value)} />
        <FlatList
          data={searchQuery === '' ? data?.characters.results : searchResults}
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
