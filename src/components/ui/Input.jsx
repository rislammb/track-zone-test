import styled from 'styled-components';

const Input = styled.input.attrs((props) => ({
  // we can define static props
  type: props.type || 'text',

  // or we can define dynamic ones
  size: props.size || '4px 8px',
}))`
  color: #ff91b6;
  font-size: 1em;
  border: 1px solid #ff91b6;
  outline: none;
  border-radius: 3px;
  background-color: inherit;

  /* here we use the dynamically computed prop */
  type: ${(props) => props.type};
  padding: ${(props) => props.size};
`;

export default Input;
