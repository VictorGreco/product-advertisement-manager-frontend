import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdvertisementTableCustomGridToolbar } from './AdvertisementTableCustomGridToolbar';

test('renders learn react link', () => {
  render(<AdvertisementTableCustomGridToolbar />);
  const linkElement = screen.getByText(/Edit advertisement/i);
  expect(linkElement).toBeInTheDocument();
});
