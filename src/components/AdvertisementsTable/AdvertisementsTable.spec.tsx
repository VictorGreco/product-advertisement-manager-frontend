import React from 'react';
import { render, screen } from '@testing-library/react';
import AdvertisementsTable from './AdvertisementsTable';

test('renders learn react link', () => {
  render(<AdvertisementsTable />);
  const linkElement = screen.getByText(/Edit advertisement/i);
  expect(linkElement).toBeInTheDocument();
});
