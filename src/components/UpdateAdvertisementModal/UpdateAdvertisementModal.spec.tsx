import React from 'react';
import { render, screen } from '@testing-library/react';
import { UpdateAdvertisementModal } from './UpdateAdvertisementModal';

test('renders learn react link', () => {
  render(<UpdateAdvertisementModal />);
  const linkElement = screen.getByText(/Edit advertisement/i);
  expect(linkElement).toBeInTheDocument();
});
