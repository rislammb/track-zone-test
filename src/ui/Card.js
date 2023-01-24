import styled from 'styled-components';

const Card = styled.div`
  padding: ${props => props.p ? `${props.p * 8}px` : '8px'};
  box-shadow: 1px 2px 3px rgba(255, 255, 255, 0.25), 2px 4px 7px rgba(255, 255, 255, 0.18);
  border-radius: 8px; 
`;

export default Card;
