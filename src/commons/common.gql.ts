import { DocumentNode, gql } from '@apollo/client';

export const GET_ADVERTISEMENT_BY_ID: DocumentNode = gql`
    query Advertisement($id: String!){
        advertisement(id: $id) {
        product_id
        title
        valid_until
        discount_percentage
        }
    }
`

export const GET_ALL_ADVERTISEMENTS: DocumentNode = gql`
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

export const NEW_ADVERTISEMENT: DocumentNode = gql`
  mutation CreateNewAdvertisement($newAdvertisementData: NewAdvertisementInput!) {
    addAdvertisement(newAdvertisementData: $newAdvertisementData) {
      product_id
      title
      valid_until
      discount_percentage
    }
  }
`;

export const UPDATE_ADVERTISEMENT: DocumentNode = gql`
    mutation UpdateAdvertisement($advertisementId: String!, $updateAdvertisementData: UpdateAdvertisementInput!) {
        updateAdvertisement(advertisementId: $advertisementId, updateAdvertisementData: $updateAdvertisementData)
    }
`;

export const DELETE_ADVERTISEMENT: DocumentNode = gql`
    mutation RemoveAdvertisement($id: String!) {
        removeAdvertisement(id: $id)
    }
`