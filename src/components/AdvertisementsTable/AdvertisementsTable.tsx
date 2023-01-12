import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';

import { GET_ALL_ADVERTISEMENTS } from '../../commons/common.gql';

import { AdvertisementTableCustomGridToolbar } from '../AdvertisementTableCustomGridToolbar/AdvertisementTableCustomGridToolbar';

import { AdvertisementsData } from './interfaces/AdvertisementsData';

function AdvertisementsTable(): JSX.Element {
  const { loading, error, data } = useQuery(GET_ALL_ADVERTISEMENTS, {
    variables: {}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const columns = [
    { field: '_id', headerName: 'Advertisement id', width: 250 },
    { field: 'product_id', headerName: 'Product id', width: 250 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'valid_until', headerName: 'Valid until', width: 250 },
    { field: 'discount_percentage', headerName: 'Discount percentage', width: 250 }
  ]

  const mapDataAdvertisements = ({ _id, product_id, title, valid_until, discount_percentage }: AdvertisementsData, index: number) => {
    return {
      id: index,
      _id,
      product_id,
      title,
      valid_until,
      discount_percentage
    }
  }

  return (
    <section>
      <div style={{ height: '100vh', width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={data?.advertisements.map(mapDataAdvertisements)}
          components={{
            Toolbar: AdvertisementTableCustomGridToolbar,
          }}
        />
      </div>
    </section>
  );
}

export default AdvertisementsTable;
