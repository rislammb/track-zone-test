import styled from 'styled-components';

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap ?? '0.25rem'};
`;

export default ListItem;
