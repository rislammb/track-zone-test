import styled from 'styled-components';

const colors = {
  primary: '#7af',
  warning: '#fa7'
};

const Button = styled.button`
  color: ${ props => props.color ? color[props.color] : palevioletred };
  font-size: 1em;
  padding: 0.25em 1em;
  border: 1px solid palevioletred;
  border-color: ${ props => props.color ? color[props.color] : palevioletred };
  border-radius: 3px;
`;

export default Button;
