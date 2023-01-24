import styled from 'styled-components';

const Input = styled.input.attrs(props => ({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  size: props.size || "4px 8px",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 1px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  padding: ${props => props.size};
`;

export default Input; 
