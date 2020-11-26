import React from 'react';
import { render } from '@testing-library/react-native';
import CharacterList from '../../app/screens/CharacterList';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARACTERS } from '../../app/queries/index';

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: {
        name: '',
      },
    },
    result: {
      data: {
        characters: {
          info: { next: 2 },
          results: [{ name: 'Rick', id: '1', image: 'dummyimage' }, { name: 'Rick', id: '1', image: 'dummyimage' }, { name: 'Rick', id: '1', image: 'dummyimage' }, { name: 'Rick', id: '1', image: 'dummyimage' }, { name: 'Rick', id: '1', image: 'dummyimage' }],
        },
      },
    },
  },
];

test('should render without error', () => {
  const { toJSON } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharacterList />
    </MockedProvider>,
  );
  expect(toJSON()).toMatchSnapshot();
});
