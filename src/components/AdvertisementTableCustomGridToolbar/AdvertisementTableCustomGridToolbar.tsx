import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { NewAdvertisementModal } from '../NewAdvertisementModal/NewAdvertisementModal';
import { UpdateAdvertisementModal } from '../UpdateAdvertisementModal/UpdateAdvertisementModal';
import { DeleteAdvertisementModal } from '../DeleteAdvertisementModal/DeleteAdvertisementModal';

export function AdvertisementTableCustomGridToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />

      <NewAdvertisementModal />
      <UpdateAdvertisementModal />
      <DeleteAdvertisementModal />
    </GridToolbarContainer>
  );
}