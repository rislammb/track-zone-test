import styled from 'styled-components';

const Card = styled.div`
  padding: ${(props) => (props.p ? `${props.p * 8}px` : '8px')};
  flex-basis: ${(props) => props.fb ?? ''};
  flex-grow: ${(props) => props.fg ?? ''};
  max-width: ${(props) => props.mw ?? ''};
  box-shadow: rgba(255, 255, 255, 0.27) 0px 5px 19px -5px;
  border-radius: 6px;
`;

export default Card;
