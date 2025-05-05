import { gql } from '@apollo/client';

export const GET_ACTIVE_PROMOTION = gql(`
  query UserPromotionStatus($listerId: ID!) {
    userPromotionStatus(listerId: $listerId)
  }
`);

export const START_PROMOTION = gql(`
    mutation StartPromotion($listerId: ID!, $category: Permission!, $price: Int!,$number: String) {
      startPromotion(listerId: $listerId, category: $category, price: $price,number: $number) {
      message
    }
  }
`);

export const UPDATE_PROMOTION = gql(`
    mutation UpdatePromotion($listerId: ID!, $category: Permission!, $price: Int!) {
        updatePromotion(listerId: $listerId, category: $category, price: $price) {
      message
    }
  }
`);

export const DELETE_PROMOTION = gql(`
    mutation DeletePromotion($listerId: ID!, $category: Permission!) {
      deletePromotion(listerId: $listerId, category: $category) {
      message
    }
  }
`);
