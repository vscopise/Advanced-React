import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Products() {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);
  return (
    <div>
      {loading && <p>Loading</p>}
      {error && <p>Error : ${error.message}</p>}
      {data && (
        <ProductList>
          {data.allProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </ProductList>
      )}
    </div>
  );
}

const ProductList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;
