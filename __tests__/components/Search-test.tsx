import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Search from '../../app/components/Search';

test('The Search Input renders correctly', () => {
  const { toJSON } = render(<Search />);
  expect(toJSON()).toMatchSnapshot();
});

test('Input should have a search icon', async () => {
  const { getByTestId } = render(<Search />);
  const searchIcon = getByTestId('search-icon');
  expect(searchIcon).toBeTruthy();
});

test('The search input is updated as the user types', async () => {
  const mockOnChangeText = jest.fn();
  const { getByTestId } = render(<Search onChangeText={mockOnChangeText} />);
  const input = getByTestId('search');

  fireEvent.changeText(input, 'Rick Sanchez');
  expect(mockOnChangeText).toHaveBeenCalledWith('Rick Sanchez');
});
