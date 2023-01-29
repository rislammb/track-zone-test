import styled from 'styled-components';

const List = styled.ul`
  background-color: ${(props) => props.bc ?? ''};
  list-style-type: none;

  & li:not(:last-child) {
    border-bottom: 1px solid #4a4a4a;
  }
`;

export default List;
