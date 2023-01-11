import { useQuery, gql } from '@apollo/client';

const GET_ALL_ADVERTISEMENTS = gql`
  query GetAllAdvertisements {
    advertisements {
      _id
      product_id
      valid_until
      discount_percentage
    }
  }
`;

function AdvertisementsTable() {
    const { loading, error, data } = useQuery(GET_ALL_ADVERTISEMENTS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="App">
        {JSON.stringify(data.advertisements)}
    </div>
  );
}

export default AdvertisementsTable;
