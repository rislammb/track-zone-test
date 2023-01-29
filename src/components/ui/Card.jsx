import styled from 'styled-components';

const Card = styled.div`
  padding: ${(props) => (props.p ? `${props.p * 8}px` : '8px')};
  flex-basis: ${(props) => props.fb ?? ''};
  flex-grow: ${(props) => props.fg ?? ''};
  max-width: ${(props) => props.mw ?? ''};
  box-shadow: rgba(199, 199, 199, 0.29) 0px 2px 10px -2px,
    rgba(199, 199, 199, 0.21) 1px 5px 10px -3px;
  background-color: ${(props) => props.bc ?? ''};
  border-radius: 6px;
  transition: all 0.11s ease-in-out;

  &:hover {
    box-shadow: rgba(199, 199, 199, 0.29) 0px 2px 13px -1px,
      rgba(199, 199, 199, 0.21) 1px 5px 13px -2px;
  }
`;

export default Card;
