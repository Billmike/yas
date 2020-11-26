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
import Error from '../components/ErrorView';
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
    overflow: 'hidden',
  },
  list: {
    marginTop: 25,
    paddingBottom: 100,
  },
  name: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    shadowColor: '#D3D3D3',
    shadowOffset: {
      width: 2,
      height: 8,
    },
    borderWidth: 1,
    borderColor: '#DCDCDC',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 10,
    marginTop: 15,
    borderRadius: 8,
    overflow: 'hidden',
    height: 300,
  },
});

const Item = ({ item, handleItemPress }: ItemProp) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleItemPress(item?.id)}>
      <Image source={{ uri: item?.image }} style={styles.image} />
      <Text style={styles.name}>{item?.name}</Text>
    </TouchableOpacity>
  );
};

const CharacterList = ({ navigation }: ICharacterList) => {
  const { loading, data, fetchMore, error } = useQuery(GET_CHARACTERS, {
    fetchPolicy: 'cache-first',
    variables: {
      name: '',
    },
  });
  const [searchQuery, setSearchQuery] = React.useState('');
  const [
    searchCharacters,
    { data: searchData, error: searchError },
  ] = useLazyQuery(SEARCH_CHARACTERS, {
    variables: {
      name: searchQuery,
    },
    fetchPolicy: 'no-cache',
  });
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
        <Search
          value={searchQuery}
          onChangeText={(value) => setSearchQuery(value)}
        />
        {(error || searchError) && (
          <Error text="Error fetching your request. Please try again" />
        )}
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
