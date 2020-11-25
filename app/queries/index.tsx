import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $name: String!) {
    characters(page: $page, filter: { name: $name }) {
      info {
        next
      }
      results {
        name
        image
        id
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      name
      species
      image
      gender
      episode {
        episode
        name
        air_date
      }
    }
  }
`;

export const SEARCH_CHARACTERS = gql`
  query GetCharacters($name: String!) {
    characters(filter: {name: $name}) {
      results {
        name
        image
        id
      }
    }
  }
`;
