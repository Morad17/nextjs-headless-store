import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($pagination: PaginationArg, $filters: ProductFiltersInput) {
    products(pagination: $pagination, filters: $filters) {
      data {
        id
        attributes {
          name
          description
          price
          slug
          featured
          stock
          createdAt
          updatedAt
          images {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          category {
            data {
              attributes {
                name
                slug
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          name
          description
          price
          slug
          featured
          stock
          createdAt
          updatedAt
          images {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          category {
            data {
              attributes {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          name
          slug
          description
        }
      }
    }
  }
`;

export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts {
    products(filters: { featured: { eq: true } }) {
      data {
        id
        attributes {
          name
          description
          price
          slug
          featured
          stock
          images {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          category {
            data {
              attributes {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;
