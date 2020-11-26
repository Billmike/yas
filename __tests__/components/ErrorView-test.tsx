import React from 'react';
import { render } from '@testing-library/react-native';
import Error from '../../app/components/ErrorView';

test('The Error component renders without error', () => {
  const { toJSON } = render(<Error text="Error" />);
  expect(toJSON()).toMatchSnapshot();
});

test('The Error component should have the text "Request Failed"', () => {
  const errorText = 'Request Failed';
  const { getByTestId } = render(<Error text={errorText} />);
  expect(getByTestId('error').props.children).toEqual(errorText);
});
