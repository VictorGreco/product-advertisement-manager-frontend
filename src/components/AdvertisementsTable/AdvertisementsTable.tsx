import { useQuery } from '@apollo/client';

import { DataGrid } from '@mui/x-data-grid';

import { GET_ALL_ADVERTISEMENTS } from '../../commons/common.gql';

import { AdvertisementTableCustomGridToolbar } from '../AdvertisementTableCustomGridToolbar/AdvertisementTableCustomGridToolbar';

interface AdvertisementsData {
  _id: string;
  title: string;
  product_id: number,
  valid_until: string;
  discount_percentage: number;
}

function AdvertisementsTable() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_ADVERTISEMENTS, {
    variables: {}
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (!data) return <></>;

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
      <div style={{ height: 400, width: '100%' }}>
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
