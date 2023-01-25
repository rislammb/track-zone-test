import styled from 'styled-components';

const Card = styled.div`
  padding: ${(props) => (props.p ? `${props.p * 8}px` : '8px')};
  flex-basis: ${(props) => props.fb ?? ''};
  flex-grow: ${(props) => props.fg ?? ''};
  box-shadow: rgba(255, 255, 255, 0.17) -4px 7px 19px -6px;
  border-radius: 4px;
`;

export default Card;
