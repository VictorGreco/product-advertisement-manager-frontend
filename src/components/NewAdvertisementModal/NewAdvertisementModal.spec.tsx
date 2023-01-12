import React from 'react';
import { render, screen } from '@testing-library/react';
import { NewAdvertisementModal } from './NewAdvertisementModal';

test('renders learn react link', () => {
  render(<NewAdvertisementModal />);
  const linkElement = screen.getByText(/Edit advertisement/i);
  expect(linkElement).toBeInTheDocument();
});
