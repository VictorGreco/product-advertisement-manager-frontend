import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';

import { NewAdvertisementModal } from '../NewAdvertisementModal/NewAdvertisementModal';
import { UpdateAdvertisementModal } from '../UpdateAdvertisementModal/UpdateAdvertisementModal';
import { DeleteAdvertisementModal } from '../DeleteAdvertisementModal/DeleteAdvertisementModal';

export function AdvertisementTableCustomGridToolbar(): JSX.Element {
  return (
    <GridToolbarContainer>
      <Grid container xs={12} justifyContent='space-around'>
        <Grid item xs={6}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Grid>

        <Grid item xs={6}>
          <NewAdvertisementModal />
          <UpdateAdvertisementModal />
          <DeleteAdvertisementModal />
        </Grid>
      </Grid>

    </GridToolbarContainer>
  );
}