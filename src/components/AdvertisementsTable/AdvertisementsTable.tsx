import { useEffect } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

import { DataGrid } from '@mui/x-data-grid';

import { AdvertisementTableCustomGridToolbar } from '../AdvertisementTableCustomGridToolbar/AdvertisementTableCustomGridToolbar';

interface AdvertisementsData {
    _id: string;
    title: string;
    product_id: number,
    valid_until: string;
    discount_percentage: number;
}

const GET_ALL_ADVERTISEMENTS = gql`
  query GetAllAdvertisements {
    advertisements {
      _id
      title
      product_id
      valid_until
      discount_percentage
    }
  }
`;

function AdvertisementsTable() {
    const [getAdvertisements, { loading, error, data }] = useLazyQuery(GET_ALL_ADVERTISEMENTS);
    
    useEffect(() => {
        getAdvertisements({ variables: {} });
    }, [])

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

  return (
    <section>
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={data?.advertisements.map(({ _id, product_id, title, valid_until, discount_percentage }: AdvertisementsData, index: number) => {
                    return {
                        id: index,
                        _id: _id,
                        product_id,
                        title,
                        valid_until,
                        discount_percentage
                    }
                })}
                components={{
                    Toolbar: AdvertisementTableCustomGridToolbar,
                }}
            />
        </div>
    </section>
  );
}

export default AdvertisementsTable;
