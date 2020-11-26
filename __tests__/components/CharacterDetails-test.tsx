import React from 'react';
import { render } from '@testing-library/react-native';
import CharacterDetails from '../../app/screens/CharacterDetails';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARACTER } from '../../app/queries';

const mocks = [
  {
    request: {
      query: GET_CHARACTER,
      variables: {
        id: '1'
      }
    },
    result: {
      data: {
        character: {
          name: 'Rick',
          gender: 'Male',
          species: 'Human',
          image: 'dummyImage',
          episode: [
            { episode: 'S01E01', name: 'Pilot', air_date: 'Nov 20, 2018' }
          ]
        }
      }
    }
  }
];

test('should render without error', () => {
  const { toJSON } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CharacterDetails route={{ params: { id: '1' } }} />
    </MockedProvider>
  );
  expect(toJSON()).toMatchSnapshot()
})