import { gql } from '@apollo/client';

export const UPDATE_ADVERTISEMENT = gql`
    mutation UpdateAdvertisement($advertisementId: String!, $updateAdvertisementData: UpdateAdvertisementInput!) {
        updateAdvertisement(advertisementId: $advertisementId, updateAdvertisementData: $updateAdvertisementData)
    }
`;

export const DELETE_ADVERTISEMENT = gql`
    mutation RemoveAdvertisement($id: String!) {
        removeAdvertisement(id: $id)
    }
`
export const NEW_ADVERTISEMENT = gql`
  mutation CreateNewAdvertisement($newAdvertisementData: NewAdvertisementInput!) {
    addAdvertisement(newAdvertisementData: $newAdvertisementData) {
      product_id
      title
      valid_until
      discount_percentage
    }
  }
`;

export const GET_ADVERTISEMENT_BY_ID = gql`
    query Advertisement($id: String!){
        advertisement(id: $id) {
        product_id
        title
        valid_until
        discount_percentage
        }
    }
`

export const GET_ALL_ADVERTISEMENTS = gql`
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