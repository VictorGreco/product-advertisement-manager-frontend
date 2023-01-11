import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { NewAdvertisementModal } from '../NewAdvertisementModal/NewAdvertisementModal';

export function AdvertisementTableCustomGridToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />

      <NewAdvertisementModal />
    </GridToolbarContainer>
  );
}