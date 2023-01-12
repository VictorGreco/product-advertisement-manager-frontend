import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeleteAdvertisementModal } from './DeleteAdvertisementModal';

test('renders learn react link', () => {
  render(<DeleteAdvertisementModal />);
  const linkElement = screen.getByText(/Edit advertisement/i);
  expect(linkElement).toBeInTheDocument();
});
